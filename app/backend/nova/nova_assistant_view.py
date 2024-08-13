# views/nova_assistant_views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from openai import OpenAI
import json
import os
from openai import AssistantEventHandler
from typing_extensions import override

class EventHandler(AssistantEventHandler):    
    def __init__(self):
        super().__init__()
        self.response_text = ""

    def on_text_created(self, text) -> None:
        self.response_text += str(text)  # Ensure it's a string
   
    def on_text_delta(self, delta, snapshot):
        self.response_text += str(delta.value)  # Convert delta.value to string
   
    def on_tool_call_created(self, tool_call):
        self.response_text += f"\n[Tool Call: {tool_call.type}]\n"

    def on_tool_call_delta(self, delta, snapshot):
        if delta.type == 'code_interpreter':
            if delta.code_interpreter.input:
                self.response_text += str(delta.code_interpreter.input)  # Convert input to string
            if delta.code_interpreter.outputs:
                self.response_text += "\n\nOutput:\n"
                for output in delta.code_interpreter.outputs:
                    if output.type == "logs":
                        self.response_text += str(output.logs)  # Convert logs to string

    def get_response(self):
        return self.response_text

# Initialize the OpenAI client
client = OpenAI(api_key=os.environ.get('OPENAI_API_KEY'))

@csrf_exempt  # Depending on your security needs, consider CSRF handling.
def nova_assistant(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_message = data.get('input')

        try:
            # Create a new thread
            thread = client.beta.threads.create()
            
            # Send the user's message to OpenAI
            client.beta.threads.messages.create(
                thread_id=thread.id,
                role="user",
                content=user_message
            )

            # Use the event handler to stream the response
            event_handler = EventHandler()

            with client.beta.threads.runs.stream(
                thread_id=thread.id,
                assistant_id="asst_EF5u8T7eLblv9iUl980nmTAE",
                instructions="Please address the user as Jane Doe. The user has a premium account.",
                event_handler=event_handler,
            ) as stream:
                stream.until_done()

            # Get the accumulated response text from the event handler
            response = event_handler.get_response()

            return JsonResponse({"response": response})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=400)
