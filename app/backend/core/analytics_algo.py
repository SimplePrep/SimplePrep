# analytics_algo.py

from .models import TestResult, UserAnswer, Question, TestReport

def generate_report(test_result):
    # Get all user answers for this test result
    user_answers = UserAnswer.objects.filter(test_result=test_result)
    
    # Initialize report data
    report = {
        'modules': {
            'Reading': {
                'sections': {},
                'total_questions': 0,
                'correct_answers': 0,
                'incorrect_answers': 0
            },
            'Writing': {
                'sections': {},
                'total_questions': 0,
                'correct_answers': 0,
                'incorrect_answers': 0
            }
        },
        'total_questions': 0,
        'correct_answers': 0,
        'incorrect_answers': 0,
        'suggestions': []
    }

    # Process each user answer
    for user_answer in user_answers:
        question = user_answer.question
        module = question.model  # Assuming 'model' field differentiates Reading and Writing
        section = question.section
        correct_answer = question.correct_answer
        selected_option = user_answer.selected_option

        # Initialize section data if not already present
        if section not in report['modules'][module]['sections']:
            report['modules'][module]['sections'][section] = {
                'total_questions': 0,
                'correct_answers': 0,
                'incorrect_answers': 0
            }

        # Update section data
        report['modules'][module]['sections'][section]['total_questions'] += 1
        report['modules'][module]['total_questions'] += 1
        report['total_questions'] += 1

        if correct_answer == selected_option:
            report['modules'][module]['sections'][section]['correct_answers'] += 1
            report['modules'][module]['correct_answers'] += 1
            report['correct_answers'] += 1
        else:
            report['modules'][module]['sections'][section]['incorrect_answers'] += 1
            report['modules'][module]['incorrect_answers'] += 1
            report['incorrect_answers'] += 1

    # Generate suggestions (this is a simple example, adjust as needed)
    for module, module_data in report['modules'].items():
        for section, section_data in module_data['sections'].items():
            if section_data['correct_answers'] / section_data['total_questions'] < 0.5:
                report['suggestions'].append(f"{section} of {module} module.")

    test_result.score = round(report['correct_answers'] / report['total_questions'] * 100, 2)
    test_result.save()
    # Save report to database
    TestReport.objects.update_or_create(
        test_result=test_result,
        defaults={'report_data': report}
    )
    
    return report
