from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pandas as pd
from datetime import datetime
import smtplib
import requests
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure Gemini API key
API_KEY = os.getenv("GEMINI_API_KEY")
gemini_available = False
chat_session = None

if API_KEY and API_KEY.strip() and API_KEY != "your_gemini_api_key_here":
    try:
        import google.generativeai as genai
        genai.configure(api_key=API_KEY)
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        website_context = """
--- COMPANY INFO ---
Name: We Automate It
Tagline: Custom Web Apps & AI Workflow Automation Agency
Description: We build custom high-performance web applications, autonomous AI agents, and n8n workflow automations so business owners can focus on growth.

--- SERVICES ---
1. Workflow Automation: Seamlessly connect apps using n8n (email parsing, database updates, CRM sync).
2. AI Chatbots & Agents: Custom GPT & Gemini-powered assistants for 24/7 customer support, internal knowledge bases, and lead qualification.
3. Custom Web Applications: Modern responsive web apps built with React, TypeScript & Tailwind CSS.
4. Internal Tools & Dashboards: Custom admin panels and real-time analytics cockpits.

--- HOW IT WORKS ---
1. Analyze: Audit workflows to identify manual bottlenecks and high-ROI targets.
2. Build: Engineer custom web apps, AI agents, and n8n background scripts.
3. Deploy & Scale: Launch systems with training and ongoing maintenance.

--- BENEFITS ---
- Save 20+ hours/week on manual data entry.
- Eliminate human errors.
- Scale business output without hiring additional staff.
- Own your data with secure private integrations.

--- CONTACT ---
Contact form at the bottom of the page or email your_receiver_email@gmail.com.
"""
        chat_session = model.start_chat(
            history=[
                {"role": "user", "parts": [
                    f"Context Information:\n{website_context}\n\n"
                    "BEHAVIORAL INSTRUCTIONS:\n"
                    "1. Provide concise, friendly, helpful answers.\n"
                    "2. Explain how We Automate It creates custom web apps, AI agents, and n8n workflows.\n"
                    "3. Append this HTML button when the user asks about pricing, booking, or how to get started:\n"
                    "   <br><br><a href='#contact' class='chat-action-btn'>Book a Strategy Call Now</a>"
                ]},
                {"role": "model", "parts": ["Understood. I will answer concisely and provide guidance on custom web apps, AI agents, and workflow automations."]}
            ]
        )
        gemini_available = True
        print("INFO: Gemini AI Engine successfully initialized.")
    except Exception as e:
        print(f"WARNING: Gemini AI initialization failed ({e}). Falling back to Knowledgebase Engine.")
else:
    print("INFO: GEMINI_API_KEY not set. Using Built-in Knowledgebase AI Assistant Engine.")

# Intelligent Built-in Knowledgebase Response Fallback
def fallback_knowledge_response(user_msg: str) -> str:
    msg = user_msg.lower().strip()

    if any(q in msg for q in ["help me", "how can this website help", "what do you do", "what is this site", "about", "how does it work"]):
        return (
            "We Automate It empowers your business by building custom web applications, autonomous AI agents, and n8n workflow automations! "
            "We eliminate repetitive manual work, automate data entry between your tools, and create custom web apps tailored to your brand.<br><br>"
            "<a href='#contact' class='chat-action-btn'>Book a Strategy Call Now</a>"
        )
    
    if any(q in msg for q in ["service", "offer", "provide", "what can you build"]):
        return (
            "We specialize in 4 core solutions:<br>"
            "1. 🌐 <b>Custom WebApp Development</b> (React, TypeScript, Next.js)<br>"
            "2. 🤖 <b>Autonomous AI Agents & Chatbots</b> (GPT-4 & Gemini AI)<br>"
            "3. ⚡ <b>n8n Workflow Automation</b> (Connecting 100+ platforms)<br>"
            "4. 📊 <b>Internal Tools & Admin Dashboards</b><br><br>"
            "Which solution fits your current project?"
        )
    
    if any(q in msg for q in ["cost", "price", "pricing", "quote", "how much", "rate"]):
        return (
            "Every custom solution is tailored to your specific workflow complexity. "
            "You can test our interactive ROI Calculator on this page or book a free consultation for an exact project estimate!<br><br>"
            "<a href='#contact' class='chat-action-btn'>Book a Strategy Call Now</a>"
        )

    if any(q in msg for q in ["contact", "book", "call", "talk", "hire", "email", "phone"]):
        return (
            "You can reach our solution architects directly using the intake form at the bottom of this page!<br><br>"
            "<a href='#contact' class='chat-action-btn'>Book a Strategy Call Now</a>"
        )

    if any(q in msg for q in ["game", "demo", "pipeline", "sandbox", "test"]):
        return (
            "You can play our interactive drag-and-drop games above! Test building an n8n workflow, matching solutions to bottlenecks, or simulating a custom tech stack.<br><br>"
            "<a href='#games' class='chat-action-btn'>Play Interactive Demos</a>"
        )

    return (
        "At **We Automate It**, we design custom full-stack web applications, AI autonomous agents, and n8n workflow relays that run your business on autopilot. "
        "How can we assist your team today?<br><br>"
        "<a href='#contact' class='chat-action-btn'>Book a Strategy Call Now</a>"
    )

app = Flask(__name__)
# Allow requests from production website and local development server
CORS(app, resources={r"/*": {"origins": ["https://we-automate-it.me", "https://www.we-automate-it.me", "http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5000", "http://localhost:5001", "http://127.0.0.1:5001"]}})

@app.route('/api/chat', methods=['POST'])
def chat_api():
    try:
        data = request.get_json(force=True, silent=True) or {}
        user_message = data.get('message', '')
        if not user_message:
            return jsonify({"status": "error", "error": "No message provided"}), 400
        
        # Query Gemini if available
        if gemini_available and chat_session:
            try:
                response = chat_session.send_message(user_message)
                return jsonify({"status": "success", "response": response.text})
            except Exception as gen_err:
                print(f"Gemini API error ({gen_err}), using knowledgebase fallback.")
        
        # Fallback response
        bot_reply = fallback_knowledge_response(user_message)
        return jsonify({"status": "success", "response": bot_reply})
    except Exception as e:
        print(f"Error in /api/chat: {e}")
        bot_reply = fallback_knowledge_response(request.json.get('message', '') if request.json else '')
        return jsonify({"status": "success", "response": bot_reply})

def sync_to_online_excel(name, email, phone, user_message, timestamp):
    """
    Syncs booking submission live to an Online Cloud Excel / Google Sheets Webhook.
    Configure ONLINE_EXCEL_WEBHOOK_URL in .env (e.g. Google Sheets AppScript or n8n webhook)
    """
    webhook_url = os.getenv("ONLINE_EXCEL_WEBHOOK_URL")
    if not webhook_url or webhook_url.startswith("your_"):
        print("INFO: ONLINE_EXCEL_WEBHOOK_URL not set in .env. Skipping cloud Excel webhook sync.")
        return

    payload = {
        "timestamp": timestamp,
        "name": name,
        "email": email,
        "phone": phone,
        "message": user_message,
        "source": "We Automate It Website"
    }

    try:
        res = requests.post(webhook_url, json=payload, timeout=8)
        if res.ok:
            print("SUCCESS: Live booking data synced to Online Cloud Excel / Google Sheet!")
        else:
            print(f"WARNING: Cloud Excel Webhook responded with status {res.status_code}")
    except Exception as e:
        print(f"WARNING: Error syncing to Online Cloud Excel Webhook ({e}). Local contacts.xlsx preserved.")

def send_notification_email(name, email, phone, user_message):
    sender_email = os.getenv("SENDER_EMAIL")
    sender_password = os.getenv("SENDER_PASSWORD")
    receiver_email = os.getenv("RECEIVER_EMAIL", "your_receiver_email@gmail.com")

    if not sender_email or not sender_password:
        print("WARNING: Email credentials not set in .env. Skipping email dispatch.")
        return

    subject = f"New Contact Form Submission from {name}"
    body = f"New submission received:\n\nName: {name}\nEmail: {email}\nPhone: {phone}\nMessage:\n{user_message}"

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, receiver_email, msg.as_string())
        server.quit()
        print("Notification email sent successfully.")
    except Exception as e:
        print(f"Error sending email: {e}")

@app.route('/api/contact', methods=['POST'])
def contact_api():
    try:
        data = request.get_json(force=True, silent=True) or {}
        name = data.get('name', '')
        email = data.get('email', '')
        phone = data.get('phone', '')
        message = data.get('message', '')
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        if not name or not email or not message:
            return jsonify({"status": "error", "error": "Name, email, and message are required"}), 400

        # 1. Save locally to Excel (contacts.xlsx)
        excel_file = "contacts.xlsx"
        new_entry = pd.DataFrame([{
            "Date": timestamp,
            "Name": name,
            "Email": email,
            "Phone": phone,
            "Message": message
        }])

        if os.path.exists(excel_file):
            try:
                df = pd.read_excel(excel_file)
                df = pd.concat([df, new_entry], ignore_index=True)
            except Exception:
                df = new_entry
        else:
            df = new_entry

        df.to_excel(excel_file, index=False)

        # 2. Live Sync to Online Cloud Excel / Google Sheet Webhook
        sync_to_online_excel(name, email, phone, message, timestamp)

        # 3. Email Notification Dispatch
        send_notification_email(name, email, phone, message)

        return jsonify({"status": "success", "message": "Form submitted and synced successfully!"})
    except Exception as e:
        print(f"Error in /api/contact: {e}")
        return jsonify({"status": "error", "error": str(e)}), 500

@app.route('/', methods=['GET'])
def root_index():
    return jsonify({
        "service": "We Automate It - AI Backend API",
        "status": "online",
        "gemini_active": gemini_available,
        "endpoints": {
            "health": "/health",
            "chat": "POST /api/chat",
            "contact": "POST /api/contact"
        }
    })

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "AI Chatbot Backend", "gemini_active": gemini_available})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, debug=True)
