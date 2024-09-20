import OpenAI from 'openai';
import { API_KEY } from '../local-config';

const openai = new OpenAI({
  apiKey: API_KEY,
});


export default {

  giveTaskCreationSuggestions: async (title) => {
    try {
      const prompt = `I will give you a task name for my todo app.
        you should generate a small task description, what is the priority of the task and what should be the priority of the task [High , Medium , Low]
        And also you should categoies the task into [Work , Study , Personal]. Output should be in  json format.
        Title is ${title}

        json format should be this
        {
          "task_title": "Walk the dog",
          "description": "Take the dog for a walk around the neighborhood to ensure it gets enough exercise and fresh air.",
          "priority": "Medium",
          "category": "Personal"
        }

        remove any append or prepend  string from the output string

      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini-2024-07-18',
        messages: [{ role: 'system', content: prompt }],
        max_tokens: 200,
      });

      const analysis = response.choices[0].message.content.trim();
      return {
        success: true,
        output: analysis
      }
    } catch (e) {
      console.error("error is -> " + e);
      return {
        success: false,
        output: ''
      }
    }
  },

  analyzeTasks: async (tasks) => {
    try {

      const prompt = `Here is a list of tasks:\n\n${tasks.map(
        (task) =>
          `Task: ${task.title}, Priority: ${task.priority}, Started date: ${task.date}, Completed: ${task.completed}`
      ).join('\n')}\n\nBased on task list that i have provided, What task should i give more time and priority first to complete all the tasks efficiently and quickly list the tasks in order based on your analysis. Give me reasons also in short form. In point form and markdown format and proper markdown line breaking. do not Show bullets or list numbers`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini-2024-07-18',
        messages: [{ role: 'system', content: prompt }],
        max_tokens: 200,
      });

      const analysis = response.choices[0].message.content.trim();
      return {
        success: true,
        output: analysis
      }
    } catch (e) {
      console.error("error is -> " + e);
      return {
        success: false,
        output: ''
      }
    }
  },
}