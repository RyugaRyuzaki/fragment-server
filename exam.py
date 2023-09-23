import requests
import zlib
import json
import pandas as pd
def load_local(base_url, file_id):

    try:
        # Tải tệp properties.gz từ máy chủ
        properties_response = requests.get(f"{base_url}/download/{file_id}frag.gz")
        properties_data = properties_response.content

        # # Giải nén dữ liệu properties
        # properties_json = pako.
        # properties = json.loads(properties_json)
        decompressed_data = zlib.decompress(properties_data)
        bytearray_data = bytearray(decompressed_data)
        # allKey = {}
        # for key in properties:
        #     if key != 'coordinationMatrix':
        #         for childKey in properties[key]:
        #             if childKey not in allKey:
        #                 allKey[childKey] = childKey

        # allKeyList = list(allKey.values())
        return bytearray_data
        # Gọi hàm loadIfcModel với buffer và properties
        # this.loadIfcModel(buffer, properties)

    except Exception as e:
        print(f"Lỗi: {str(e)}")
        return [['Alex',10],['Bob',12],['Clarke',13]]

# Gọi hàm load_local với baseUrl và fileId cụ thể
base_url = "http://localhost:3000"
file_id = "CenterConference"
df=load_local(base_url, file_id)
de=[['Alex',10],['Bob',12],['Clarke',13]]
print(df)
# we can use python to call data