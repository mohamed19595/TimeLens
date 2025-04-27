empire_data = [
    {
        "empire": "Roman Empire",
        "time_period": [(27, 'BC'), (476, 'AD')],
        "countries": ["Italy", "Spain", "France", "Greece", "Turkey", "Egypt", "Tunisia", "Romania", "Portugal"]
    },
    {
        "empire": "Byzantine Empire",
        "time_period": [(330, 'AD'), (1453, 'AD')],
        "countries": ["Greece", "Turkey", "Cyprus", "Italy", "North Africa"]
    },
    {
        "empire": "Ottoman Empire",
        "time_period": [(1299, 'AD'), (1922, 'AD')],
        "countries": ["Turkey", "Greece", "Syria", "Iraq", "Lebanon", "Egypt", "Algeria", "Saudi Arabia"]
    },
    {
        "empire": "Mongol Empire",
        "time_period": [(1206, 'AD'), (1368, 'AD')],
        "countries": ["China", "Mongolia", "Russia", "Iran", "Iraq", "Kazakhstan", "Ukraine"]
    },
    {
        "empire": "British Empire",
        "time_period": [(1583, 'AD'), (1997, 'AD')],
        "countries": ["United Kingdom", "Canada", "Australia", "India", "Egypt", "South Africa", "Nigeria"]
    },
    {
        "empire": "Persian Empire (Achaemenid)",
        "time_period": [(550, 'BC'), (330, 'BC')],
        "countries": ["Iran", "Iraq", "Afghanistan", "Egypt", "Turkey", "Armenia", "Pakistan"]
    },
    {
        "empire": "Carthaginian Empire",
        "time_period": [(9, 'BC'), (146, 'BC')],
        "countries": ["Tunisia", "Algeria", "Libya", "Spain", "France"]
    },
    {
        "empire": "Aztec Empire",
        "time_period": [(1428, 'AD'), (1521, 'AD')],
        "countries": ["Mexico"]
    },
    {
        "empire": "Inca Empire",
        "time_period": [(1438, 'AD'), (1533, 'AD')],
        "countries": ["Peru", "Ecuador", "Bolivia", "Chile", "Argentina", "Colombia"]
    },
    {
        "empire": "Egyptian Empire",
        "time_period": [(3100, 'BC'), (30, 'BC')],
        "countries": ["Egypt"]
    },
    {
        "empire": "Maurya Empire",
        "time_period": [(322, 'BC'), (185, 'BC')],
        "countries": ["India", "Pakistan", "Nepal", "Bangladesh", "Afghanistan"]
    },
    {
        "empire": "Gupta Empire",
        "time_period": [(320, 'AD'), (550, 'AD')],
        "countries": ["India", "Pakistan", "Nepal", "Bangladesh"]
    }
]

import json

# Save to a JSON file
with open("empires.json", "w") as file:
    json.dump(empire_data, file, indent=4)