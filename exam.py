import requests
import zlib
import json
import pandas as pd
def load_data(base_url, file_id):
    try:
        properties_response = requests.get(f"{base_url}/download/{file_id}.gz")
        properties_data = properties_response.content
        decompressed_data = zlib.decompress(properties_data)
        return json.loads(decompressed_data)
    except Exception as e:
        print(f"Error: {str(e)}")
        return None
def get_building_name(building):
        value=''
        if building['ObjectType'] is not None:
            value=building['ObjectType']['value'] 
        elif building['Name'] is not None:
            value=building['Name']['value'] 
        elif building['LongName']is not None:
            value=building['LongName']['value'] 
        return value  
def convert_data(jsonData):
    if jsonData is None:
        return None,None
    if jsonData['spatialTree'] is None:
        return None,None
    spatialTree=jsonData['spatialTree']
    elements=[]
    for key,value in spatialTree.items():
        element=jsonData[str(key)]
        for keyE, valueE in element.items():
            if isinstance(valueE, dict) and 'value' in valueE:
                element[keyE] = str(valueE['value'])
            elif valueE is not None:
                element[keyE]=str(valueE)
        
        elements.append(element)
    return elements
base_url = "http://localhost:3000"
file_id = "CenterConference"
elements=convert_data(load_data(base_url, file_id))
elements=(pd.DataFrame(elements))
print(elements)
# we can use python to call data