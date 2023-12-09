# Image Restorer Cloud Functions

## Usage

### Send image restoration request

```bash
curl -X POST -H "Content-Type: application/json" -d '{"base64Data": "base64_encoded_image_data"}' CLOUD_FUNCTION_URL/image_restoration
```

### Check image restoration

```bash
curl -X GET -H "Content-Type: application/json" -d CLOUD_FUNCTION_URL/image_restoration/ID
```