<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    public function chat(Request $request)
    {
        $userMessage = $request->input('message');

        if (!$userMessage) {
            return response()->json(['status' => 'error', 'error' => 'No message provided'], 400);
        }

        $apiKey = env('GROQ_API_KEY');
        if (!$apiKey || $apiKey === 'your_groq_api_key_here') {
            return $this->fallbackResponse($userMessage);
        }

        $model = env('GROQ_MODEL', 'llama-3.3-70b-versatile');

        try {
            $systemPrompt = $this->getWebsiteContext();

            $response = Http::withToken($apiKey)
                ->withoutVerifying()
                ->timeout(15)
                ->post('https://api.groq.com/openai/v1/chat/completions', [
                    'model' => $model,
                    'messages' => [
                        ['role' => 'system', 'content' => $systemPrompt],
                        ['role' => 'user', 'content' => $userMessage],
                    ],
                ]);

            if ($response->successful()) {
                $reply = $response->json('choices.0.message.content');
                return response()->json(['status' => 'success', 'response' => $reply]);
            }

            Log::error('Groq API Error: ' . $response->body());
            return $this->fallbackResponse($userMessage);

        } catch (\Exception $e) {
            Log::error('ChatController Error: ' . $e->getMessage());
            return $this->fallbackResponse($userMessage);
        }
    }

    private function getWebsiteContext(): string
    {
        return <<<EOT
--- COMPANY INFO ---
Name: We Automate It
Tagline: Custom Web Apps & AI Workflow Automation Agency
Description: We build custom high-performance web applications, autonomous AI agents, and n8n workflow automations so business owners can focus on growth.

--- SERVICES ---
1. Workflow Automation: Seamlessly connect apps using n8n (email parsing, database updates, CRM sync).
2. AI Chatbots & Agents: Custom GPT & Groq-powered assistants for 24/7 customer support, internal knowledge bases, and lead qualification.
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

BEHAVIORAL INSTRUCTIONS:
1. Provide concise, friendly, helpful answers.
2. Explain how We Automate It creates custom web apps, AI agents, and n8n workflows.
3. Append this HTML button when the user asks about pricing, booking, or how to get started:
   <br><br><a href='#contact' class='chat-action-btn'>Book a Strategy Call Now</a>
EOT;
    }

    private function fallbackResponse(string $userMsg): \Illuminate\Http\JsonResponse
    {
        $msg = strtolower(trim($userMsg));

        if (str_contains($msg, 'help me') || str_contains($msg, 'what do you do') || str_contains($msg, 'about') || str_contains($msg, 'how does it work') || str_contains($msg, 'what is this site')) {
            $reply = "We Automate It empowers your business by building custom web applications, autonomous AI agents, and n8n workflow automations! We eliminate repetitive manual work, automate data entry between your tools, and create custom web apps tailored to your brand.<br><br><a href='#contact' class='chat-action-btn'>Book a Strategy Call Now</a>";
            return response()->json(['status' => 'success', 'response' => $reply]);
        }

        if (str_contains($msg, 'service') || str_contains($msg, 'offer') || str_contains($msg, 'provide') || str_contains($msg, 'what can you build')) {
            $reply = "We specialize in 4 core solutions:<br>1. 🌐 <b>Custom WebApp Development</b> (React, TypeScript, Next.js)<br>2. 🤖 <b>Autonomous AI Agents & Chatbots</b> (GPT-4 & Groq AI)<br>3. ⚡ <b>n8n Workflow Automation</b> (Connecting 100+ platforms)<br>4. 📊 <b>Internal Tools & Admin Dashboards</b><br><br>Which solution fits your current project?";
            return response()->json(['status' => 'success', 'response' => $reply]);
        }
        
        if (str_contains($msg, 'cost') || str_contains($msg, 'price') || str_contains($msg, 'pricing') || str_contains($msg, 'quote') || str_contains($msg, 'how much') || str_contains($msg, 'rate')) {
            $reply = "Every custom solution is tailored to your specific workflow complexity. You can test our interactive ROI Calculator on this page or book a free consultation for an exact project estimate!<br><br><a href='#contact' class='chat-action-btn'>Book a Strategy Call Now</a>";
            return response()->json(['status' => 'success', 'response' => $reply]);
        }
        
        if (str_contains($msg, 'contact') || str_contains($msg, 'book') || str_contains($msg, 'call') || str_contains($msg, 'talk') || str_contains($msg, 'hire') || str_contains($msg, 'email') || str_contains($msg, 'phone')) {
             $reply = "You can reach our solution architects directly using the intake form at the bottom of this page!<br><br><a href='#contact' class='chat-action-btn'>Book a Strategy Call Now</a>";
             return response()->json(['status' => 'success', 'response' => $reply]);
        }
        
        if (str_contains($msg, 'game') || str_contains($msg, 'demo') || str_contains($msg, 'pipeline') || str_contains($msg, 'sandbox') || str_contains($msg, 'test')) {
             $reply = "You can play our interactive drag-and-drop games above! Test building an n8n workflow, matching solutions to bottlenecks, or simulating a custom tech stack.<br><br><a href='#games' class='chat-action-btn'>Play Interactive Demos</a>";
             return response()->json(['status' => 'success', 'response' => $reply]);
        }

        $reply = "At **We Automate It**, we design custom full-stack web applications, AI autonomous agents, and n8n workflow relays that run your business on autopilot. How can we assist your team today?<br><br><a href='#contact' class='chat-action-btn'>Book a Strategy Call Now</a>";
        return response()->json(['status' => 'success', 'response' => $reply]);
    }
}
