# beton-interaktion

This is a web demo of the excel sheets that can be found [here](https://github.com/robertlachmann/beton-interaktion).

Check out the website at [kurtlachmann.github.io/beton-interaktion](https://kurtlachmann.github.io/beton-interaktion).

## Deployment
To deploy the website run `npm run deploy`. This will build the site to the `build` directory and
push it to the `gh-pages` branch. This branch serves as the source for GitHub Pages.


## Statistics
The counter must be initialized manually once. Make sure the key is created with `enable_reset=1`.
Otherwise the value won't be reset and it's going to show the same number of visitors each day,
plus the new visitors.

To create a new counter:
```
https://api.countapi.xyz/create?namespace=mynamespace&key=mykey&value=0&enable_reset=1
```
