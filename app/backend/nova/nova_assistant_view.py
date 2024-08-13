# views/nova_assistant_views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from openai import OpenAI
import json
import os
from openai import AssistantEventHandler
from typing_extensions import override

class EventHandler(AssistantEventHandler):    
  @override
  def on_text_created(self, text) -> None:
    print(f"\nassistant > ", end="", flush=True)
      
  @override
  def on_text_delta(self, delta, snapshot):
    print(delta.value, end="", flush=True)
      
  def on_tool_call_created(self, tool_call):
    print(f"\nassistant > {tool_call.type}\n", flush=True)
  
  def on_tool_call_delta(self, delta, snapshot):
    if delta.type == 'code_interpreter':
      if delta.code_interpreter.input:
        print(delta.code_interpreter.input, end="", flush=True)
      if delta.code_interpreter.outputs:
        print(f"\n\noutput >", flush=True)
        for output in delta.code_interpreter.outputs:
          if output.type == "logs":
            print(f"\n{output.logs}", flush=True)

client = OpenAI(api_key=os.environ.get('OPENAI_API_KEY'))

@csrf_exempt  # Depending on your security needs, consider CSRF handling.
def nova_assistant(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_message = data.get('input')

        try:
            thread = client.beta.threads.create()
            
            message = client.beta.threads.messages.create(
                thread_id=thread.id,
                role="user",
                content=user_message
            )

            with client.beta.threads.runs.stream(
                thread_id=thread.id,
                assistant_id="asst_EF5u8T7eLblv9iUl980nmTAE",
                instructions="Please address the user as Jane Doe. The user has a premium account.",
                event_handler=EventHandler(),
            ) as stream:
                response = stream.until_done()
            return JsonResponse({"response": response})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=400)
