# wdio-html-advance-reporter
Customized wdio html report with graphical representation, toggle views, scenario/steps breakdown details, real time testdata log and so many advanced features
A reporter for webdriver.io which generates a HTML report.
Based off the excellent [wdio-spec-reporter](https://www.npmjs.com/package/wdio-spec-reporter)

## Installation

The easiest way is to keep the `wdio-html-advance-reporter` as a devDependency in your package.json:

```javascript
{
  "devDependencies": {
    "wdio-html-advance-reporter": "~1.0.8"
  }
}
```

Or, you can simply do it with:

```
npm install wdio-html-advance-reporter --save-dev
```

## Setup

For webdriverio add below in wdio conf file


```
  reporters: ['html-advance'],
  
  reporterOptions: {
    htmlFormat: {
      outputDir: `./e2e/reports/html-reports/${report_id}`,
      reportTitle:'Your-Project-Title'
    }
  },

```

## Snapshot

![Report Screenshot](wdio-html-advance-report.png)

