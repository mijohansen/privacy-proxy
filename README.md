# Privacy Proxy

This project is heavily inspired and copied from amplitude-proxy by navikt. The main difference is:

- Kafka is replaced by Postgres (due to the NOTIFY/LISTEN functionality postgres can sync data between pods)
- Privacy Proxy will support some further `user_id`-features.
- Support for multiple tracking tools with native endpoint
  override.
- The autotrack feature from NAV-IKT is made more generic.

This project was generated using [Nx](https://nx.dev).

## Update routine

Just some general housekeeping to keep up with NX.

```
nx migrate latest
nx migrate --run-migrations
npm update

npm outdated
```

Some of the dev dependencies are managed by nx, so just don't stress about them.
And then just run the test suites to ensure that everything still works.

## Enrichers

Enrichers are data providers that enrich your analytics events in certain ways. Since we are tracking server
side its logical to keep extra data on this side instead of piping it all at once. As the world is moving
towards micro-services, micro-frontends and multi-device scenarios tracking implementation gets cumbersome
when doing it across services. This also let you add data that really shouldn't be exposed to endusers, but
which is madly interesting from an analytics perspective. For instance net revenue or customer loyalty status
or other customer segmentation criterias.

Tools like Google Analytics have had these features for ages, so the idea is not new. Moving this logikk to
the server-side just make sense. This way you could easiliy expand data to various services that need them
without needing to look them up at the client-side.

### Ingress Enrichers

Ingresses are a concept borrowed from the K8-terminology. I use this
here to mainly describe the routing of traffic based on routes. A route
mighh be a path with a full url. This is handy as it gives.

The way this app is put together it will only hit one ingress entry in a
particular set. But you might have multiple ingress sets. This gives you the
opportunity to create a matrix of data. Most would probably not do this. But
ha handy feature is to for instance set API_KEYS based on which route you want
to enrich. An usecase is ofc to set teamname and application name based on routes.

Ingresses can be administered though the api, or through the user interface. And
will be persisted to the database. They will entirely be read into the memory of the
app at startup. So be aware that massive data here will consume some memory.

### Product Enrichers

Keep your product-catalogue inside you p-one analytics server.

### User Enrichers

You might add user data, for instance user loyality class, creditrating or other important
customer segmentation info.

### Event Enrichers

Events are tracked with a single "Event Name" that is defining what the event actually is.
In for instance Google Analytics this would be the event action. You could for instance use
this enricher to add event category or event label or other event properties.

## Client trackers

```
@privacy-one/analytics-sdk
@privacy-one/react
@privacy-one/vue
```
