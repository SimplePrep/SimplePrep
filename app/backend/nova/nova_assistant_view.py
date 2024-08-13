# views/nova_assistant_views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import openai
import json
import os

openai.api_key = os.environ.get('OPENAI_PROJECT_API')

@csrf_exempt  # Depending on your security needs, consider CSRF handling.
def nova_assistant(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_input = data.get('input')

        try:
            thread = openai.Thread.create()
            message = openai.Thread.message.create(thread.id, role='user', content=user_input)

            output = ""
            run = openai.Thread.run.stream(thread.id, assistant_id="asst_KUHrlXRHKvdtllxJ42GdSgts")
            
            for response in run:
                if 'text' in response:
                    output += response['text']

            return JsonResponse({"response": output})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)
