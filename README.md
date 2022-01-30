# Privacy Proxy

This project is heavily inspired and copied from amplitude-proxy by navikt. The main difference is:

- Kafka is replaced by Postgres (due to the NOTIFY/LISTEN functionality postgres can sync data between pods)
- Privacy Proxy will support some further `user_id`
- Support for multiple tracking tools with native endpoint
  override.
- The autotrack feature is made more generic.

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