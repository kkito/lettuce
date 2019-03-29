## Boto3 presigned url use curl to post

### put的方式

```
s3 = boto3.client('s3')
url= s3.generate_presigned_url(ClientMethod='put_object', 
    Params={
        'Bucket': DEFAULT_BUCKET, 
        'Key': file_key,
    }, ExpiresIn=3600)


```

by using curl we can put a file into aws s3 `curl -v --request PUT --upload-file test.txt "presigned url"`

### post 

```
resp = s3.generate_presigned_post(
    Bucket= DEFAULT_BUCKET,
    Key= file_key,
    ExpiresIn=3600)
```

resp is like `{'url': u'https://bucket.s3.amazonaws.com/', 'fields': {'policy': u'xxxx', 'AWSAccessKeyId': u'xxx', 'key': 'filekey', 'signature': u'xxx'}}`

we can also use curl to post file

```
curl -v -F AWSAccessKeyId=xx \
     -F key=test/mytest.txt \
     -F signature=xxxx \
     -F policy=xxxx \
     -F file=@/tmp/test.txt \
     https://bucket.s3.amazonaws.com/
```

### post presigned url and set content type

```
resp = s3.generate_presigned_post(
    Bucket= DEFAULT_BUCKET,
    Fields={
        'Content-Type': 'text/plain'
    },
    Key= file_key,
    Conditions=[
        ['starts-with', '$content-type', 'text/plain']
    ],
    ExpiresIn=3600)
```

it works after both set fields and Conditions 


