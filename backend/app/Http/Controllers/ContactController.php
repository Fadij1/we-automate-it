<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function contact(Request $request)
    {
        $name = $request->input('name');
        $email = $request->input('email');
        $phone = $request->input('phone');
        $message = $request->input('message');
        $timestamp = now()->format('Y-m-d H:i:s');

        if (!$name || !$email || !$message) {
            return response()->json(['status' => 'error', 'error' => 'Name, email, and message are required'], 400);
        }

        try {
            // 1. Save locally to CSV
            $this->saveToCsv($timestamp, $name, $email, $phone, $message);

            // 2. Live Sync to Online Cloud Excel / Google Sheet Webhook
            $this->syncToOnlineSheet($timestamp, $name, $email, $phone, $message);

            // 3. Email Notification Dispatch
            $this->sendNotificationEmail($name, $email, $phone, $message);

            return response()->json(['status' => 'success', 'message' => 'Form submitted and synced successfully!']);
        } catch (\Exception $e) {
            Log::error('Contact API Error: ' . $e->getMessage());
            return response()->json(['status' => 'error', 'error' => $e->getMessage()], 500);
        }
    }

    private function saveToCsv($timestamp, $name, $email, $phone, $message)
    {
        $file = base_path('contacts.csv');
        $exists = file_exists($file);

        $fp = fopen($file, 'a');
        if (!$exists) {
            fputcsv($fp, ['Date', 'Name', 'Email', 'Phone', 'Message']);
        }
        
        fputcsv($fp, [$timestamp, $name, $email, $phone, $message]);
        fclose($fp);
    }

    private function syncToOnlineSheet($timestamp, $name, $email, $phone, $message)
    {
        $webhookUrl = env('ONLINE_EXCEL_WEBHOOK_URL');
        if (!$webhookUrl || str_starts_with($webhookUrl, 'your_')) {
            Log::info('ONLINE_EXCEL_WEBHOOK_URL not set in .env. Skipping cloud Excel webhook sync.');
            return;
        }

        $payload = [
            'timestamp' => $timestamp,
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'message' => $message,
            'source' => 'We Automate It Website',
        ];

        try {
            $response = Http::withoutVerifying()->timeout(12)->post($webhookUrl, $payload);
            if ($response->successful()) {
                Log::info("Live booking data for '{$name}' synced to Online Google Sheet!");
            } else {
                Log::warning("Cloud Excel Webhook responded with status {$response->status()}");
            }
        } catch (\Exception $e) {
            Log::warning("Error syncing to Online Cloud Excel Webhook: " . $e->getMessage());
        }
    }

    private function sendNotificationEmail($name, $email, $phone, $userMessage)
    {
        $receiverEmail = env('RECEIVER_EMAIL');
        if (!$receiverEmail || $receiverEmail === 'your_receiver_email@gmail.com') {
            Log::warning('Email credentials not set in .env. Skipping email dispatch.');
            return;
        }

        $subject = "New Contact Form Submission from {$name}";
        $body = "New submission received:\n\nName: {$name}\nEmail: {$email}\nPhone: {$phone}\nMessage:\n{$userMessage}";

        try {
            Mail::raw($body, function ($message) use ($receiverEmail, $subject) {
                $message->to($receiverEmail)
                        ->subject($subject);
            });
            Log::info('Notification email sent successfully.');
        } catch (\Exception $e) {
            Log::error('Error sending email: ' . $e->getMessage());
        }
    }
}
