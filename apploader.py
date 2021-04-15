import os
from argparse import ArgumentParser
import requests
from smart_open import open


class Apk(object):
    BASE_URL = "https://my.famoco.com/api/organizations/"

    def __init__(self, filename, environment) -> None:
        self.filename = filename
        self.environment = environment
        self.API_URL = (
            f"{self.BASE_URL}{os.environ.get('FAMOCO_ORGANIZATION_ID')}"
        )
        self.sess = requests.Session()
        self.sess.headers.update(
            {"Authorization": f"Bearer {os.environ.get('FAMOCO_API_TOKEN')}"}
        )

    def upload_files(self) -> None:
        with open(self.filename, "rb") as out_file:
            resp = self.sess.post(
                f"{self.API_URL}/applications/", files={"apk": out_file}
            )
            if resp.status_code == 201:
                upl_data = resp.json()
                print(
                    f"*SUCCESS:* Version *{upl_data['package_version_name']}* uploaded to MDM"
                )
            else:
                data = resp.json()
                print(
                    f"*FAILED:* Upload to MDM Failed: *{data['errors']['apk'][0]}*"
                )


parser = ArgumentParser()
parser.add_argument(
    "name", help="apk name", type=str
)
parser.add_argument(
    "path",
    help="path to apk",
    default="android/app/build/outputs/apk",
)

args = parser.parse_args()

apk_file = [file for file in os.listdir(args.path) if file[-3:] == "apk"][0]
apk = Apk(os.path.join(args.path, apk_file), args.name)
apk.upload_files()
