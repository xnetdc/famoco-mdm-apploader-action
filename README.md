# Famoco MDM Apploader action

This action uploads an apk to the Famoco MDM

## Environment vars

### `FAMOCO_API_TOKEN`

**required** The api token from famoco

### `FAMOCO_ORGANIZATION_ID`

**required** The organization id from famoco

## Inputs

### `apk`

**Required** The name and path of the apk.

## Outputs

### `time`

The time it was executed.

## Example usage

    -uses: actions/famoco-mdm-apploader-action@v1.4.2
     env:
       FAMOCO_API_TOKEN: ${{ secrets.FAMOCO_API_TOKEN }}
       FAMOCO_ORGANIZATION_ID: ${{ secrets.FAMOCO_ORGANIZATION_ID }}
     with:
       apk: app/build/outputs/release/apkandroid.release.apk
