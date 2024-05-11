# Fullstack RAG-Application

A starting point of building Domain-Specific Chatbots. It converts PDF-Documents into Text Embeddings and enables asking questions about it.

# Requirements
Make sure you have ollama installed (ollama.com). If you haven't already, download Llama3 through it so the application will be able to use it.
If you want to change the LargeLanguageModel used in this backend, simply go to api.py and switch the 'model' parameter in the call_llm function.

# Frontend
This is a simple Next.js Application that helps communicating with the Python-Backend.

ChatArea is the Main Component and returns the Chat-History as List of Paragraphs.

It calls the Python Backend at http://localhost:5601/query and prints the response as stream.

# Backend
To get started, install the required dependencies listed in requirements.txt.

Create a new Folder called 'Docs' inside the 'Backend' Folder and place your PDF-Documents in here.

Run api.py: This will first initialize the Document-Index with the helper-functions located in index_manager.py.


You now have your backend-Endpoint ready.

`Note: In a scalable scenarion you will want to use a Vector-Database instead of storing the embeddings as files. `

# How to run
I recommend using two terminal-windows: one for Backend and one for Frontend

To start the Frontend run:
`python3 api.py`

To start the Frontend run:
`npm run dev`

# Special Thanks
Special Thanks go out to the amazing work of the open-source community, making this technology available for everyone.

## Meta AI
https://www.meta.ai

## Ollama
https://ollama.com

## LlamaIndex
https://www.llamaindex.ai

## Huggingface
https://huggingface.co

## Intfloat
https://github.com/intfloat

# Contributing

Your contributions and feedback are welcome! Here's how you can contribute:
- **Issues**: Report bugs or suggest enhancements by opening an issue.
- **Pull Requests**: Fork the repository, make your changes, and submit a pull request describing your improvements.