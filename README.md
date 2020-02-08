# Zmq probe

Command line interface for [zmq-json-rpc-client](https://github.com/claudijo/zmq-json-rpc-client).

```
Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --endpoint, -e  Zmq json rpc server endpoint or tcp port on localhost
                                                             [string] [required]
  --method, -m    A String containing the name of the method to be invoked.
                                                             [string] [required]
  --params, -p    A Structured value that holds the parameter values to be used
                  during the invocation of the method. This member MAY be
                  omitted.                                              [string]
  --id, -i        An identifier established by the Client that MUST contain a
                  String, Number, or NULL value if included. If it is not
                  included it is assumed to be a notification.
```