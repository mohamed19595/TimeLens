from langchain_groq import ChatGroq
from langchain.tools import tool
import requests
import json
import os

from crewai import Agent, Crew, Task

@tool("Search the internet")
def search_internet(query):
    """Useful to search the internet
    about a a given topic and return relevant results"""
    top_result_to_return = 4
    url = "https://google.serper.dev/search"
    payload = json.dumps({"q": query})
    headers = {
        'X-API-KEY': "846a3f461ac9a4f44e9ebbe7638186c4def8a1ee",
        'content-type': 'application/json'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    # check if there is an organic key
    if 'organic' not in response.json():
        return "Sorry, I couldn't find anything about that, there could be an error with you serper api key."
    else:
        results = response.json()['organic']
        string = []
        for result in results[:top_result_to_return]:
            try:
                string.append('\n'.join([
                    f"Title: {result['title']}", f"Link: {result['link']}",
                    f"Snippet: {result['snippet']}", "\n-----------------"
                ]))
            except KeyError:
                next

        return '\n'.join(string)

llm_llama = ChatGroq(
    api_key = "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",
    model = "llama3-8b-8192",
        )

Data_collector_expert = Agent(
    role="""Expert in data collection of historical data""",
    goal="""To collect data of the history of civilisation when they began and when they ended
    and most importantly where they were located in reference to the current world map""",
    backstory=""" I am an expert in collecting historical data of civilisations that have existed in the past.
    """,
    allow_delegation=False,
    tools=[search_internet],
    verbose=True,
    llm=llm_llama,
)

collecting_data = Task(
    description="""
    Collect data of the history of civilisation when they began and when they ended
    and most importantly where they were located in reference to the current world map""",
    expected_output="""A csv file containing the data of the history of civilisation when they began and when they ended
    and were located in reference to the current world map. So the columns should be the name of the civilisation, the date 
    it began, the date it ended and the name of all countries that it was located in""",
    agent=Data_collector_expert,
    output_file="data.csv",
)

crew = Crew(
    agents=[Data_collector_expert],
    tasks=[collecting_data],
    verbose=True,
)

result = crew.kickoff()
print(result)

