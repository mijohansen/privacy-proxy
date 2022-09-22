## Endpoints

```
POST /api/v1/connect-identities
[
  "an.email.adress@somethin.tld",
  "+4792304234",
  "123125123",
]

Adds metadata to ingress urls.

POST     /api/v1/ingress-data
DELETE   /api/v1/ingress-data

POST     /api/v1/right-to-be-forgotten
{
  user_id:   "an.email.adress@somethin.tld"
}

/shorten
```

## Tables

### users

| user_id(PRIMARY)                   | tracking_id | type  | forgotten | created  |
| ---------------------------------- | ----------- | ----- | --------- | -------- |
| sha(an.email.adress@somethin.tld)  | 501ad05e    | email | false     | sometime |
| sha(an.email2.adress@somethin.tld) | NULL        | NULL  | false     |          |

### ingresses

| ingress

## Cache

user_ids need to be cached in memory in every script. The number should be around the needed
number of concurrent users for that installation.

Cache could be warmed up. This could be done with some kind of extra table which contain the last
visited users.

users_concurrent (Same schema as users)

| user(PRIMARY)                     | user_id  | type  | forgotten | last_seen |
| --------------------------------- | -------- | ----- | --------- | --------- |
| sha(an.email.adress@somethin.tld) | 501ad05e | email | false     | today     |

## GEO-location

Proxy will have a copy of that in memory

## Data sending

Data should be sent in a queue out of the pod. Or bulkvise.

## Urlshortner can be used to measure email or sms

Email or phone number is not exposed to any services along the way, and sessions could be stitched together.

```
POST     /api/v1/get-short
{
  "user":  "an.email.adress@somethin.tld",
  "url":   "https://some.tld/anurl",
  "event": "Email Link Clicked",
  "title": "My endless pursuit of customers"
}
returns "http://proxy-domain.tld/s/1ad05sdf"


POST  /api/v1/track-short

```

`http://proxy-domain.tld/s/1ad05sdf` will expand to `https://some.tld/anurl?s=1ad05sdf` which later could be used to further analysis. Short
param can be expanded further through the proxies `/api/v1/track-short` which hides all PII from the browser and various other potential risks.

SHORT

| short | user_id  | type  | created | event              |
| ----- | -------- | ----- | ------- | ------------------ |
| 1ad05 | 501ad05e | email | today   | Email Link Clicked |

## The Collect endpoints

This solution is tailormade for receiving data from different contexts.
Istead of trying to unify the api we are keeping keeping the endpoints
separate. The browser collect endpoint for instance is using the
information from the request to enrich events as targets 

The default endpoints are as follows:
```
/collect
```



