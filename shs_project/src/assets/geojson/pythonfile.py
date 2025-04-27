import os
import json

# Get the current directory
directory = os.getcwd()

# Loop through all files in the current directory
for filename in os.listdir(directory):
    if filename.endswith(".geojson"):
        # Full path of the .geojson file
        geojson_path = os.path.join(directory, filename)
        
        # Read the .geojson file
        with open(geojson_path, 'r', encoding='utf-8') as file:
            geojson_data = file.read()
        
        # Verify if the content is valid JSON
        try:
            json.loads(geojson_data)  # Ensure it's valid JSON
        except json.JSONDecodeError as e:
            print(f"Invalid GeoJSON in file {filename}: {e}")
            continue

        # Prepare the content for the .js file
        js_content = f"export const statesData = {geojson_data};"

        # Save with a .js extension
        js_filename = os.path.splitext(filename)[0] + ".js"
        js_path = os.path.join(directory, js_filename)
        
        with open(js_path, 'w', encoding='utf-8') as js_file:
            js_file.write(js_content)
        
        print(f"Converted {filename} to {js_filename}")
