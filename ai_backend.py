from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

# Configure your Gemini API key
API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyBZK2CBqMOXfoy4Cvx1hMMGE4qT7w25VAk") #AIzaSyBC6d1mLaorwCDsG6ipDaD5vvS5OnyTVwY
genai.configure(api_key=API_KEY)

# Create the model and chat session
model = genai.GenerativeModel("gemini-2.5-flash")
# Define the website knowledge base
website_context = """
--- COMPANY INFO ---
Name: We Automate It
Tagline: AI & Workflow Automation Agency
Description: We automate business workflows using AI and n8n so owners can focus on growth.

--- SERVICES ---
1. Workflow Automation: Seamlessly connect apps using n8n (email parsing, database updates).
2. AI Chatbots: Custom GPT-powered assistants for customer support, internal knowledge bases, and lead qualification.
3. CRM Integration: Sync HubSpot, Salesforce, or Pipedrive data with marketing/sales tools.
4. Internal Tools: Custom dashboards and admin panels for business logic and data needs.

--- HOW IT WORKS ---
1. Analyze: Audit workflows to identify bottlenecks.
2. Build: Create custom scripts, AI agents, and integrations.
3. Deploy & Scale: Launch systems, provide training, and offer maintenance.

--- WHY CHOOSE US (BENEFITS) ---
- Save 20+ hours/week on manual data entry.
- Eliminate human error.
- Scale output without hiring more staff.
- Own your data with secure integrations.
- Use cases: Lead Management, Support Bots, Auto-Invoicing, Social Media Automation.

--- MISSION & VISION ---
Mission: Empower businesses to reclaim time and unlock growth via intelligent automation.
Vision: To be a global leader in automation consulting.
Values: Efficiency, Scalability, Innovation.

--- CONTACT ---
Location: Form at the bottom of the webpage.
"""

# Initialize Chat with Strict Behavioral Instructions
chat = model.start_chat(
    history=[
        {"role": "user", "parts": [
            f"Context Information:\n{website_context}\n\n"
            "--- BEHAVIORAL INSTRUCTIONS ---\n"
            "You are the assistant for 'We Automate It'. Follow these rules strictly:\n"
            "1. SHORT ANSWERS: Keep responses concise and to the point.\n"
            "2. GENERAL INQUIRIES: If the user asks 'what services do you provide?' or similar general questions, "
            "DO NOT describe them. Instead, output this exact format:\n"
            "   - Workflow Automation\n"
            "   - AI Chatbots\n"
            "   - CRM Integration\n"
            "   - Internal Tools\n"
            "   What are you interested in?\n"
            "3. SPECIFIC INQUIRIES: If the user asks about a specific service or topic, explain it briefly using the Context Information.\n"
            "4. CALL TO ACTION: At the end of every response (except 'help' requests), suggest the user fill out the form by appending this HTML EXACTLY:\n"
            "   <br><br><a href='#contact' class='chat-action-btn' onclick='document.getElementById(\"chat-interface\").classList.remove(\"active\")'>Book a Call Now</a>\n"
            "5. DISTRESS/HELP: If the user asks for 'help' (e.g., 'help me', 'I need support'), respond ONLY with: 'Please contact us at fadijohn9@gmail.com'.\n"
            "6. NO HALLUCINATIONS: Do not make up info not found in the Context Information."
        ]},
        {"role": "model", "parts": ["Understood. I will answer briefly, use the list format for general questions, and append the HTML button code for the contact form."]}
    ]
)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["https://we-automate-it.me", "https://www.we-automate-it.me"]}})  # Allow requests from your frontend

@app.route('/api/chat', methods=['POST'])
def chat_api():
    try:
        user_message = request.json.get('message', '')
        if not user_message:
            return jsonify({"status": "error", "error": "No message provided"}), 400
        
        # Send the message to Gemini
        response = chat.send_message(user_message)
        return jsonify({"status": "success", "response": response.text})
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "AI Chatbot Backend"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
