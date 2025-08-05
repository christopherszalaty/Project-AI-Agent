# import os 
# import uuid
# from typing import Annotated, TypedDict, List

# from dotenv import load_dotenv
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from sse_starlette.sse import EventSourceResponse
# from langchain_tavily import TavilySearch

# Import relevant functionality
from langchain.chat_models import init_chat_model
from langchain_tavily import TavilySearch
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
from langchain_google_genai import ChatGoogleGenerativeAI

memory = MemorySaver()
model = ChatGoogleGenerativeAI(model="gemini-1.5-pro-latest", temperature=0, streaming=True)
search = TavilySearch(max_results=2)
tools = [search]
agent_executor = create_react_agent(model, tools, checkpointer=memory)

