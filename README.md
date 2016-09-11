# NetFlex

NetFlex is a light chrome extension that remove movies chosen by you from Netflix browse page.

## NetFlex Popup

**NetFlex** has a chrome extension popup with its features:

<img width="827" alt="screen shot 2016-09-10 at 9 37 21 pm" src="https://cloud.githubusercontent.com/assets/1071893/18414670/6ab3c5c0-77a1-11e6-9aa1-d3fb610ab66e.png">

## Choose titles to hide:

Inside **NetFlex** popup there's a button `Actions`, click it and select the items you want to hide/show:

<img width="814" alt="screen shot 2016-09-10 at 9 36 31 pm" src="https://cloud.githubusercontent.com/assets/1071893/18414669/6ab3ae1e-77a1-11e6-8fed-4d6d1fb9b9bc.png">

## Hide/Show items:

Inside **NetFlex** popup there's another button `Display`, click it to hide/show your list:

<img width="817" alt="screen shot 2016-09-10 at 9 37 04 pm" src="https://cloud.githubusercontent.com/assets/1071893/18414668/6ab39924-77a1-11e6-9b36-cd48c8f79fb6.png">

---

## Development

```shell
git clone git@github.com:vnegrisolo/netflex.git
```

Open your chrome extensions: `chrome://extensions/`.

Enable `Developer mode`.

Click `Load unpacked extensions...` and find `netflex` cloned repo.

This is how you should see:

<img width="753" alt="screen shot 2016-09-10 at 9 59 49 pm" src="https://cloud.githubusercontent.com/assets/1071893/18414690/efa8d284-77a1-11e6-8e68-2cdb669531b8.png">

## Deployment

Upgrade `manifest.json` file with the new version.

Create a git tag with the changes.

```shell
cd ~/netflex;
cd ..;
./netflex/bin/package.sh netflex netflex.pem;
./netflex/bin/compact.sh;
```

And then upload the zip file.
