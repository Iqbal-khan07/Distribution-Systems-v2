import json_mock
import requests
import json

base_url = "http://localhost:8080/api"

if __name__ == '__main__':
    print(requests.post(url = (base_url + "/shop/create"), json = json.loads(json_mock.create_shop())).json())