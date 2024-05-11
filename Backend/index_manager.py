from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings, StorageContext, load_index_from_storage
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
import os

# Adjustable Settings:
INDEX_PATH = "./index"
Settings.llm = Ollama(model="llama3", request_timeout=30.0)
Settings.chunk_size = 512
Settings.embed_model = HuggingFaceEmbedding(
    model_name="intfloat/multilingual-e5-large"
)

index = None

def init_index():
    """
    Initializes the Index.
    If Index is already built, just load it into memory.
    Otherwise, iterate over the "Docs" Folder, create a new Index and load it into memory.
    """
    global index
    if not os.path.exists(INDEX_PATH) or not os.listdir(INDEX_PATH):
        print("Index not found. Rebuilding now...")
        documents = SimpleDirectoryReader("Docs").load_data()
        index = VectorStoreIndex.from_documents(
            documents,
        )
        index.storage_context.persist(persist_dir=INDEX_PATH)
    else:
        print("Found index!")
        storage_context = StorageContext.from_defaults(persist_dir=INDEX_PATH)
        index = load_index_from_storage(storage_context)

def get_retriever():
    init_index()
    return index.as_retriever(similarity_top_k=3)