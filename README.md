# NetFlex

NetFlex is a light chrome extension that remove movies/tv-series chosen by you from Netflix browse page.

That's how you'll see you Netflix page:

<img width="640" alt="hidden-titles-1280x800" src="https://cloud.githubusercontent.com/assets/1071893/18605638/59aa25bc-7c65-11e6-8813-4657fcdca470.png">

## Choose titles to hide:

Inside **NetFlex** popup there's a button `Actions`, click it and select the items you want to hide/show:

<img width="640" alt="popup-with-actions-1280x800" src="https://cloud.githubusercontent.com/assets/1071893/18605639/59c4bb02-7c65-11e6-86bc-325337217986.png">

## Hide/Show items:

Inside **NetFlex** popup there's another button `Display`, click it to hide/show your list:

<img width="640" alt="popup-with-actions-and-display-1280x800" src="https://cloud.githubusercontent.com/assets/1071893/18605640/59e395e0-7c65-11e6-972b-ad58771c44cd.png">

---

## Development

```shell
git clone git@github.com:vnegrisolo/netflex.git
```

Open your chrome extensions: `chrome://extensions/`.

Enable `Developer mode`.

Click `Load unpacked extensions...` and find `netflex` cloned repo.

This is how you should see:

<img width="761" alt="developer-mode" src="https://cloud.githubusercontent.com/assets/1071893/18605637/58f03dd2-7c65-11e6-8965-9d27ade2bc09.png">

## Deployment

Upgrade `manifest.json` file with the new version.

Create a git tag with the changes.

```shell
cd ~/netflex;
cd ..;
./netflex/bin/package.sh netflex netflex.pem;
./netflex/bin/compact.sh;
```

And then upload the zip file into: [chrome-webstore][]

[chrome-webstore]: https://chrome.google.com/webstore/developer/dashboard
