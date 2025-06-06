import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import { ExtensionPreferences } from 'resource:////org/gnome/Shell/Extensions/js/extensions/prefs.js';
import GObject from 'gi://GObject';
import GLib from 'gi://GLib';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// Taken from https://github.com/material-shell/material-shell/blob/main/src/utils/gjs.ts
/// Decorator function to call `GObject.registerClass` with the given class.
/// Use like
/// ```
/// @registerGObjectClass
/// export class MyThing extends GObject.Object { ... }
/// ```
function registerGObjectClass(target) {
    // Note that we use 'hasOwnProperty' because otherwise we would get inherited meta infos.
    // This would be bad because we would inherit the GObjectName too, which is supposed to be unique.
    if (Object.prototype.hasOwnProperty.call(target, 'metaInfo')) {
        // eslint-disable-next-line
        // @ts-ignore
        // eslint-disable-next-line
        return GObject.registerClass(target.metaInfo, target);
    }
    else {
        // eslint-disable-next-line
        // @ts-ignore
        return GObject.registerClass(target);
    }
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var stringFormat = createCommonjsModule(function (module) {
void function(global) {

  //  ValueError :: String -> Error
  function ValueError(message) {
    var err = new Error(message);
    err.name = 'ValueError';
    return err;
  }

  //  create :: Object -> String,*... -> String
  function create(transformers) {
    return function(template) {
      var args = Array.prototype.slice.call(arguments, 1);
      var idx = 0;
      var state = 'UNDEFINED';

      return template.replace(
        /([{}])\1|[{](.*?)(?:!(.+?))?[}]/g,
        function(match, literal, _key, xf) {
          if (literal != null) {
            return literal;
          }
          var key = _key;
          if (key.length > 0) {
            if (state === 'IMPLICIT') {
              throw ValueError('cannot switch from ' +
                               'implicit to explicit numbering');
            }
            state = 'EXPLICIT';
          } else {
            if (state === 'EXPLICIT') {
              throw ValueError('cannot switch from ' +
                               'explicit to implicit numbering');
            }
            state = 'IMPLICIT';
            key = String(idx);
            idx += 1;
          }

          //  1.  Split the key into a lookup path.
          //  2.  If the first path component is not an index, prepend '0'.
          //  3.  Reduce the lookup path to a single result. If the lookup
          //      succeeds the result is a singleton array containing the
          //      value at the lookup path; otherwise the result is [].
          //  4.  Unwrap the result by reducing with '' as the default value.
          var path = key.split('.');
          var value = (/^\d+$/.test(path[0]) ? path : ['0'].concat(path))
            .reduce(function(maybe, key) {
              return maybe.reduce(function(_, x) {
                return x != null && key in Object(x) ?
                  [typeof x[key] === 'function' ? x[key]() : x[key]] :
                  [];
              }, []);
            }, [args])
            .reduce(function(_, x) { return x; }, '');

          if (xf == null) {
            return value;
          } else if (Object.prototype.hasOwnProperty.call(transformers, xf)) {
            return transformers[xf](value);
          } else {
            throw ValueError('no transformer named "' + xf + '"');
          }
        }
      );
    };
  }

  //  format :: String,*... -> String
  var format = create({});

  //  format.create :: Object -> String,*... -> String
  format.create = create;

  //  format.extend :: Object,Object -> ()
  format.extend = function(prototype, transformers) {
    var $format = create(transformers);
    prototype.format = function() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(this);
      return $format.apply(global, args);
    };
  };

  /* istanbul ignore else */
  {
    module.exports = format;
  }

}.call(commonjsGlobal, commonjsGlobal);
});

function tooltipText(_) {
    const pad = (s, w) => s +
        Array(w - s.length)
            .fill(' ')
            .join('');
    return [
        ['q', _('Quote currency code')],
        ['qs', _('Quote currency symbol')],
        ['b', _('Base currency code')],
        ['bs', _('Base currency symbol')],
        ['btc', _('Bitcoin symbol (₿)')],
        ['v', _('formatted value with defaults')],
        ['mv', _('formatted value with defaults, divided by ') + (1000).toLocaleString()],
        ['kv', _('formatted value with defaults, multiplied by ') + (1000).toLocaleString()],
        ['satv', _('formatted value with defaults, multiplied by ') + (1e8).toLocaleString()],
        ['(m|k|sat)v0', _('formatted value with 0 decimals')],
        ['(m|k|sat)v1', _('formatted value with 1 decimal')],
        ['(m|k|sat)v2', _('formatted value with 2 decimals')],
        ['...', ''],
        ['(m|k|sat)v8', _('formatted value with 8 decimals')],
        ['moscow', _('formatted in moscow time')],
        ['moscow!segment', _('formatted in moscow time as segment characters')],
        ['raw', _('raw value without additional formatting')],
    ]
        .map(([a, b]) => `<tt>${pad(a, 16)}</tt>${b}`)
        .join('\n');
}

/**
 * Api definitions
 */
class Api {
    tickers = [];
    getLabel({ base, quote }) {
        return `${this.apiName} ${base}/${quote}`;
    }
    getTickerInstance(ticker) {
        const equalArray = (arr1, arr2) => arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);
        const equalObjects = (obj1, obj2) => {
            const keys1 = Object.keys(obj1).sort();
            const keys2 = Object.keys(obj2).sort();
            return (equalArray(keys1, keys2) &&
                equalArray(keys1.map((k) => obj1[k]), keys1.map((k) => obj2[k])));
        };
        const match = this.tickers.find((t) => equalObjects(t, ticker));
        if (match) {
            return match;
        }
        this.tickers.push(ticker);
        return ticker;
    }
    getTicker({ base, quote }) {
        return this.getTickerInstance({ base, quote });
    }
    parseData(data, ticker) {
        return Number(this.getLast(data, ticker));
    }
    getDefaultTicker() {
        return { base: 'BTC', quote: 'USD' };
    }
}

class Api$1 extends Api {
    apiName = 'Binance';
    apiDocs = [['API Docs', 'https://binance-docs.github.io/apidocs/spot/en/#symbol-price-ticker']];
    interval = 15;
    getUrl({ base, quote }) {
        return `https://api.binance.com/api/v3/ticker/price?symbol=${base}${quote}`;
    }
    getLast({ price }) {
        return price;
    }
    getDefaultTicker() {
        return { base: 'BTC', quote: 'USDT' };
    }
}

class Api$2 extends Api {
    apiName = 'Binance Futures';
    apiDocs = [
        [
            'API Docs',
            'https://binance-docs.github.io/apidocs/futures/en/' + '#24hr-ticker-price-change-statistics-market_data',
        ],
    ];
    interval = 15;
    getUrl({ base, quote }) {
        return `https://fapi.binance.com/fapi/v1/ticker/price?symbol=${base}${quote}`;
    }
    getLast({ price }) {
        return price;
    }
    getDefaultTicker() {
        return { base: 'BTC', quote: 'USDT' };
    }
}

class Api$3 extends Api {
    apiName = 'Bit2C';
    apiDocs = [['API Docs', 'https://bit2c.co.il/home/api']];
    interval = 10; // unknown, guessing
    getUrl({ base, quote }) {
        return `https://bit2c.co.il/Exchanges/${base}${quote}/Ticker.json`;
    }
    getLast(data) {
        if (data.error) {
            throw new Error(data.error);
        }
        return data.ll;
    }
    getDefaultTicker() {
        return { base: 'BTC', quote: 'NIS' };
    }
}

class Api$4 extends Api {
    apiName = 'Bitfinex';
    apiDocs = [
        ['API Docs', 'https://docs.bitfinex.com/v1/reference#rest-public-ticker'],
        ['Symbols (JSON)', 'https://api.bitfinex.com/v1/symbols'],
    ];
    /* quote https://www.bitfinex.com/posts/188
     *
     * > If an IP address exceeds 90 requests per minute to the REST APIs,
     * > the requesting IP address will be blocked for 10-60 seconds
     */
    interval = 10;
    getUrl({ base, quote }) {
        switch (base) {
            case 'DASH':
                base = 'DSH';
                break;
            case 'IOTA':
                base = 'IOT';
                break;
            case 'QTUM':
                base = 'QTM';
                break;
            case 'DATA':
                base = 'DAT';
                break;
            case 'QASH':
                base = 'QSH';
                break;
        }
        return `https://api.bitfinex.com/v2/ticker/t${base}${quote}/`;
    }
    getLast(data) {
        return data[6];
    }
    getDefaultTicker() {
        return { base: 'BTC', quote: 'USD' };
    }
}

class Api$5 extends Api {
    apiName = 'BitMEX';
    apiDocs = [['API Docs', 'https://www.bitmex.com/app/restAPI']];
    // ```
    //   Requests to our REST API are rate limited to 300 requests per 5
    //   minutes.  This counter refills continuously. If you are not logged in,
    //   your ratelimit is 150/5minutes.
    // ```
    interval = 10;
    getUrl({ base, quote }) {
        const symbol = `${base}${quote}`.toUpperCase();
        return 'https://www.bitmex.com' + `/api/v1/instrument?symbol=${symbol}&columns=lastPrice`;
    }
    getLast(data, { base, quote }) {
        data = data[0];
        const symbol = `${base}${quote}`.toUpperCase();
        if (data.symbol !== symbol) {
            throw new Error(`expected symbol ${symbol}, get ${data.symbol}`);
        }
        return data.lastPrice;
    }
    getDefaultTicker() {
        return { base: 'XBT', quote: 'USD' };
    }
}

class Api$6 extends Api {
    apiName = 'BitPay';
    apiDocs = [['API Docs', 'https://bitpay.com/api']];
    interval = 60; // unclear, should be safe
    getUrl({ base }) {
        return `https://bitpay.com/api/rates/${base}`;
    }
    getLast(data, { base: _base, quote }) {
        const result = data.find(({ code }) => code === quote);
        if (!result) {
            throw new Error(`no data for quote ${quote}`);
        }
        return result.rate;
    }
}

class Api$7 extends Api {
    apiName = 'Bitso';
    apiDocs = [
        ['API Docs', 'https://bitso.com/api_info#http-api-responses'],
        ['Books (JSON)', 'https://api.bitso.com/v3/available_books'],
    ];
    /* quote https://bitso.com/api_info#rate-limits
     *
     * > Rate limits are are based on one minute windows. If you do more than 30
     * > requests in a minute, you get locked out for one minute.
     */
    interval = 10;
    getUrl({ base, quote }) {
        return `https://api.bitso.com/v3/ticker?book=${base}_${quote}`.toLowerCase();
    }
    getLast({ payload }) {
        return payload.last;
    }
}

class Api$8 extends Api {
    apiName = 'Bitstamp';
    apiDocs = [['API Docs', 'https://www.bitstamp.net/api/']];
    // Quote 2013-08-09  ---  https://www.bitstamp.net/api/
    // `` Do not make more than 600 request per 10 minutes or we will ban your
    //  IP address. ''
    interval = 10;
    getUrl({ base, quote }) {
        return `https://www.bitstamp.net/api/v2/ticker/${base}${quote}`.toLowerCase();
    }
    getLast(data) {
        return data.last;
    }
}

class Api$9 extends Api {
    apiName = 'Bittrex';
    apiDocs = [['API Docs', 'https://bittrex.github.io/api/v3#operation--markets--marketSymbol--ticker-get']];
    interval = 15;
    getUrl({ base, quote }) {
        return `https://api.bittrex.com/v3/markets/${base}-${quote}/ticker`;
    }
    getLast({ lastTradeRate }) {
        return lastTradeRate;
    }
}

class Api$a extends Api {
    apiName = 'Buda';
    apiDocs = [['API Docs', 'https://api.buda.com/#la-api-de-buda-com']];
    interval = 60;
    getDefaultTicker() {
        return { base: 'BTC', quote: 'CLP' };
    }
    getUrl({ base, quote }) {
        return `https://www.buda.com/api/v2/markets/${base}-${quote}/ticker`;
    }
    getLast({ ticker }) {
        return ticker.last_price[0];
    }
}

class Api$b extends Api {
    apiName = 'BTCMarkets';
    apiDocs = [
        ['API Docs', 'https://github.com/BTCMarkets/API/wiki/Market-data-API'],
        ['Active Markets (JSON)', 'https://api.btcmarkets.net/v2/market/active'],
    ];
    interval = 10;
    getUrl({ base, quote }) {
        return `https://api.btcmarkets.net/market/${base}/${quote}/tick`;
    }
    getLast(data) {
        if (data.success !== false) {
            return data.lastPrice;
        }
        const { errorCode, errorMessage } = data;
        throw new Error(`${errorCode}: ${errorMessage}`);
    }
    getDefaultTicker() {
        return { base: 'BTC', quote: 'AUD' };
    }
}

class Api$c extends Api {
    apiName = 'CEX.IO';
    apiDocs = [
        ['API Docs', 'https://cex.io/rest-api#ticker'],
        ['Pairs (JSON)', 'https://cex.io/api/currency_limits'],
    ];
    interval = 10;
    getUrl({ base, quote }) {
        return `https://cex.io/api/ticker/${base}/${quote}`;
    }
    getLast({ last, error }) {
        if (error) {
            throw new Error(error);
        }
        return last;
    }
}

class Api$d extends Api {
    apiName = 'Coinbase';
    apiDocs = [['API Docs', 'https://developers.coinbase.com/api/v2#exchange-rates']];
    interval = 60; // unclear, should be safe
    getUrl({ base }) {
        base = base.toUpperCase();
        return `https://api.coinbase.com/v2/exchange-rates?currency=${base}`;
    }
    getLast(data, { quote }) {
        const { rates } = data.data;
        if (!rates) {
            throw new Error('invalid response');
        }
        quote = quote.toUpperCase();
        if (!(quote in rates)) {
            throw new Error(`no data for quote ${quote}`);
        }
        return rates[quote];
    }
}

class Api$e extends Api {
    apiName = 'CoinGecko';
    apiDocs = [
        ['API Docs', 'https://www.coingecko.com/api/docs/v3#/coins/get_coins_list'],
        ['Coins List (JSON)', 'https://api.coingecko.com/api/v3/coins/list'],
    ];
    // ```
    //   7 Dec 2018= Due to the overwhelming requests we are receiving, we are
    //   updating our api limit from 10/second to 300/minute, that is 13
    //   million requests/month!
    // ```
    interval = 10;
    getUrl({ base }) {
        return `https://api.coingecko.com/api/v3/coins/${base}/tickers`.toLowerCase();
    }
    getLast(data, { quote }) {
        if (!data.tickers) {
            throw new Error('no tickers');
        }
        const result = data.tickers.find(({ target }) => target === quote.toUpperCase());
        if (!result) {
            throw new Error(`no quote currency ${quote.toUpperCase()}`);
        }
        return result.last;
    }
    getDefaultTicker() {
        return { base: 'bitcoin', quote: 'usd' };
    }
}

class Api$f extends Api {
    apiName = 'CryptoCompare';
    apiDocs = [['API Docs', 'https://min-api.cryptocompare.com/documentation']];
    interval = 15;
    getUrl({ base, quote }) {
        return `https://min-api.cryptocompare.com/data/price?fsym=${base}&tsyms=${quote}`;
    }
    getLast(data, { quote }) {
        if (!(quote in data)) {
            throw new Error(`no data for quote ${quote}`);
        }
        return data[quote];
    }
}

class Api$g extends Api {
    apiName = 'FTX exchange';
    apiDocs = [['API Docs', 'https://docs.ftx.com/#get-markets']];
    interval = 15;
    getUrl({ base, quote }) {
        return `https://ftx.com/api/markets/${base}/${quote}`;
    }
    getLast({ result }) {
        return result.last;
    }
}

class Api$h extends Api {
    apiName = 'Gate.io';
    apiDocs = [['API Docs', 'https://www.gate.io/docs/developers/apiv4']];
    interval = 60; // unknown, guessing
    getUrl({ base, quote }) {
        return `https://api.gateio.ws/api/v4/spot/tickers?currency_pair=${base}_${quote}`;
    }
    getLast(data) {
        if (!Array.isArray(data) || data.length !== 1) {
            throw new Error('invalid response');
        }
        return data[0].last;
    }
    getDefaultTicker() {
        return { base: 'BTC', quote: 'USDT' };
    }
}

class Api$i extends Api {
    apiName = 'HitBTC';
    apiDocs = [['API Docs', 'https://api.hitbtc.com/']];
    interval = 15;
    getUrl({ base, quote }) {
        return 'https://api.hitbtc.com/api/2/public/ticker/' + `${base}${quote}`.toUpperCase();
    }
    getLast({ last }) {
        return last;
    }
}

class Api$j extends Api {
    apiName = 'Huobi';
    apiDocs = [['API Docs', 'https://huobiapi.github.io/docs/spot/v1/en/#introduction']];
    // Each API Key can send maximum of 100 https requests within 10 seconds
    // so 15 should be safe.
    interval = 15;
    getUrl({ base, quote }) {
        return 'https://api.huobi.pro/market/detail/' + `merged?symbol=${base}${quote}`.toLowerCase();
    }
    getLast(data) {
        if (data['status'] === 'error') {
            throw new Error(data['err-msg']);
        }
        return data.tick.bid[0];
    }
    getDefaultTicker() {
        return { base: 'btc', quote: 'usdt' };
    }
}

class Api$k extends Api {
    apiName = 'Kraken';
    apiDocs = [
        ['API Docs', 'https://www.kraken.com/help/api#public-market-data'],
        ['Asset Pairs (JSON)', 'https://api.kraken.com/0/public/AssetPairs'],
    ];
    interval = 10; // unknown, guessing
    getUrl({ base, quote }) {
        return `https://api.kraken.com/0/public/Ticker?pair=${base}${quote}`;
    }
    getLast({ result, error }, { base, quote }) {
        if (error && error.length) {
            throw new Error(error[0]);
        }
        const pair = `${base}${quote}`;
        if (pair in result) {
            return result[pair].c[0];
        }
        throw new Error(`no data for pair ${pair}`);
    }
    getDefaultTicker() {
        return { base: 'XXBT', quote: 'ZUSD' };
    }
}

class Api$l extends Api {
    apiName = 'Kucoin';
    apiDocs = [['API Docs', 'https://docs.kucoin.com/']];
    interval = 15;
    getUrl({ base, quote }) {
        return 'https://openapi-v2.kucoin.com/api/v1/market/orderbook/level1?symbol=' + `${base}-${quote}`.toUpperCase();
    }
    getLast({ code, msg, data }) {
        if (code != 200000) {
            throw new Error(msg);
        }
        return data.price;
    }
    getDefaultTicker() {
        return { base: 'BTC', quote: 'USDT' };
    }
}

class Api$m extends Api {
    apiName = 'MEXC';
    apiDocs = [['API Docs', 'https://mexcdevelop.github.io/apidocs/spot_v3_en']];
    interval = 10; // unknown, guessing
    getUrl({ base, quote }) {
        // https://mexcdevelop.github.io/apidocs/spot_v3_en/#symbol-price-ticker
        return `https://api.mexc.com/api/v3/ticker/price?symbol=${base}${quote}`;
    }
    getLast(data) {
        return data.price;
    }
    getDefaultTicker() {
        return { base: 'BTC', quote: 'USDT' };
    }
}

class Api$n extends Api {
    apiName = 'Nobitex';
    apiDocs = [['API Docs', 'https://apidocs.nobitex.ir/#quickstart']];
    interval = 15;
    getUrl({ base, quote }) {
        return `https://api.nobitex.ir/v2/orderbook/${base}${quote}`;
    }
    getLast({ lastTradePrice }, { quote }) {
        return quote == 'IRT' ? lastTradePrice / 10 : lastTradePrice;
    }
    getDefaultTicker() {
        return { base: 'BTC', quote: 'USDT' };
    }
}

class Api$o extends Api {
    apiName = 'Paymium';
    apiDocs = [['API Docs', 'https://github.com/Paymium/api-documentation#ticker']];
    interval = 60; // unclear, should be safe
    getUrl({ base: _base, quote }) {
        if (quote === 'BTC') {
            // returns some garbage
            throw new Error(`invalid quote ${quote}`);
        }
        return `https://paymium.com/api/v1/data/${quote}/ticker`.toLowerCase();
    }
    getLast({ price }, { base }) {
        if (base !== 'BTC') {
            throw new Error(`invalid base ${base}`);
        }
        return price;
    }
    getDefaultTicker() {
        return { base: 'BTC', quote: 'EUR' };
    }
}

class Api$p extends Api {
    apiName = 'Satang.pro';
    apiDocs = [['API Docs', 'https://docs.satang.pro/apis/public/orders']];
    interval = 60; // unclear, should be safe
    getUrl({ base, quote }) {
        return 'https://api.tdax.com/api/orders/?pair=' + `${base}_${quote}`.toLowerCase();
    }
    getLast(data) {
        const bidding = parseFloat(data.bid[0].price);
        const asking = parseFloat(data.ask[0].price);
        return (asking - bidding) * 0.5 + bidding;
    }
    getDefaultTicker() {
        return { base: 'BTC', quote: 'THB' };
    }
}

const tokenInfo = {
    TOMO: { address: '0x0000000000000000000000000000000000000001', decimal: 18 },
    BTC: { address: '0xAE44807D8A9CE4B30146437474Ed6fAAAFa1B809', decimal: 8 },
    ETH: { address: '0x2EAA73Bd0db20c64f53fEbeA7b5F5E5Bccc7fb8b', decimal: 18 },
    USDT: { address: '0x381B31409e4D220919B2cFF012ED94d70135A59e', decimal: 6 },
    POMO: { address: '0X31E58CCA9ECAA057EDABACCFF5ABFBBC3443480C', decimal: 18 },
    YFI: { address: '0XE189A56891F6CA22797878E34992395A4AFBDE46', decimal: 18 },
    ORBYT: { address: '0X4DD28C75B28F05DF193B4E1BBB61CD186EB968C6', decimal: 18 },
    DEC: { address: '0xfEB9aE1cCEc15cD8CcD37894eF3E24EC5414e781', decimal: 18 },
    SRM: { address: '0xc01643aC912B6a8ffC50CF8c1390934A6142bc91', decimal: 6 },
    VNDC: { address: '0xC43A2df23dAfACb9106AB239896599B705E2e67e', decimal: 0 },
    FTX: { address: '0x33fa3c0c714638f12339F85dae89c42042a2D9Af', decimal: 18 },
};
function getTokenInfo(code) {
    if (!(code in tokenInfo)) {
        throw new Error(`no TokenInfo for ${code}`);
    }
    return tokenInfo[code];
}
class Api$q extends Api {
    apiName = 'TomoX(TomoChain)';
    apiDocs = [['API Docs', 'https://apidocs.tomochain.com/#tomodex-apis-trades']];
    interval = 15;
    getDefaultTicker() {
        return { base: 'TOMO', quote: 'USDT' };
    }
    getUrl({ base, quote }) {
        const baseAddress = getTokenInfo(base).address;
        const quoteAddress = getTokenInfo(quote).address;
        return `https://dex.tomochain.com/api/pair/data?baseToken=${baseAddress}&quoteToken=${quoteAddress}`;
    }
    getLast({ data }) {
        let decimal = 18;
        Object.keys(tokenInfo).forEach(function (key) {
            if (tokenInfo[key].address == data.pair.quoteToken) {
                decimal = tokenInfo[key].decimal;
            }
        });
        return data.close / Math.pow(10, decimal);
    }
}

class Api$r extends Api {
    apiName = 'VccExchange(Vietnam)';
    apiDocs = [['API Docs', 'https://vcc.exchange/api']];
    interval = 15;
    getUrl({ base, quote }) {
        return `https://api.vcc.exchange/v3/trades/${base}_${quote}`;
    }
    getLast({ message, data }) {
        if (message != null) {
            throw new Error(message);
        }
        return data[0].price;
    }
    getDefaultTicker() {
        return { base: 'BTC', quote: 'USDT' };
    }
}

class Api$s extends Api {
    apiName = 'Bybit';
    apiDocs = [
        ['API Docs', 'https://bybit-exchange.github.io/docs/v5/market/tickers'],
        ['Symbols', 'https://bybit-exchange.github.io/docs/v5/enum#symbol'],
    ];
    /* quote https://bybit-exchange.github.io/docs/v5/rate-limit
     *
     * `No more than 120 requests are allowed in any 5-second window.`
     */
    interval = 10;
    getUrl({ base, quote }) {
        const symbol = `${base}${quote}`.toUpperCase();
        return `https://api.bybit.com/v5/market/tickers?category=spot&symbol=${symbol}`;
    }
    getLast(data) {
        if (data.retMsg !== 'OK') {
            throw new Error(data.retMsg);
        }
        return data.result.list[0].lastPrice;
    }
    getDefaultTicker() {
        return { base: 'BTC', quote: 'USDT' };
    }
}

class Api$t extends Api {
    apiName = 'Bybit Perpetual';
    apiDocs = [
        ['API Docs', 'https://bybit-exchange.github.io/docs/v5/market/tickers'],
        ['Symbols', 'https://bybit-exchange.github.io/docs/v5/enum#symbol'],
    ];
    /* quote https://bybit-exchange.github.io/docs/v5/rate-limit
     *
     * `No more than 120 requests are allowed in any 5-second window.`
     */
    interval = 10;
    getUrl({ base, quote }) {
        const symbol = `${base}${quote}`.toUpperCase();
        return `https://api.bybit.com/v5/market/tickers?category=linear&symbol=${symbol}`;
    }
    getLast(data) {
        if (data.retMsg !== 'OK') {
            throw new Error(data.retMsg);
        }
        return data.result.list[0].lastPrice;
    }
    getDefaultTicker() {
        return { base: 'BTC', quote: 'USDT' };
    }
}

const Providers = {
    binance: new Api$1(),
    binanceFutures: new Api$2(),
    bit2c: new Api$3(),
    bitfinex: new Api$4(),
    bitmex: new Api$5(),
    bitpay: new Api$6(),
    bitso: new Api$7(),
    bitstamp: new Api$8(),
    bittrex: new Api$9(),
    btcmarkets: new Api$b(),
    buda: new Api$a(),
    bybit: new Api$s(),
    bybitPerpetual: new Api$t(),
    cexio: new Api$c(),
    coinbase: new Api$d(),
    coingecko: new Api$e(),
    cryptocompare: new Api$f(),
    ftx: new Api$g(),
    gate: new Api$h(),
    hitbtc: new Api$i(),
    huobi: new Api$j(),
    kraken: new Api$k(),
    kucoin: new Api$l(),
    mexc: new Api$m(),
    nobitex: new Api$n(),
    paymium: new Api$o(),
    poloniex: new Api$6(),
    satangpro: new Api$p(),
    tomox: new Api$q(),
    vccexchange: new Api$r(),
};
function getProvider(name) {
    if (name in Providers) {
        return Providers[name];
    }
    else {
        throw new Error(`unknown api ${name}`);
    }
}

function makeConfigRow(description, widget) {
    const box = new Gtk.Box({
        orientation: Gtk.Orientation.HORIZONTAL,
        margin_bottom: 8,
        hexpand: true,
        vexpand: false,
    });
    const label = new Gtk.Label({
        label: description,
        xalign: 0,
        hexpand: true,
        vexpand: true,
    });
    box.append(label);
    box.append(widget);
    return box;
}
function debounce(milliseconds, func) {
    let tag = null;
    return () => {
        if (tag !== null) {
            GLib.source_remove(tag);
        }
        tag = GLib.timeout_add(GLib.PRIORITY_DEFAULT, milliseconds, () => {
            func();
            tag = null;
            return GLib.SOURCE_REMOVE;
        });
    };
}
let ComboBoxView = class ComboBoxView extends GObject.Object {
    static metaInfo = {
        GTypeName: 'ComboBoxView',
        Signals: {
            changed: {
                param_types: [GObject.TYPE_STRING],
                accumulator: 0,
            },
        },
    };
    Columns = { LABEL: 0, VALUE: 1 };
    widget;
    model;
    _options;
    constructor(options) {
        super();
        const model = new Gtk.ListStore();
        model.set_column_types([GObject.TYPE_STRING]);
        const comboBox = new Gtk.ComboBox({ model });
        const renderer = new Gtk.CellRendererText();
        comboBox.pack_start(renderer, true);
        comboBox.add_attribute(renderer, 'text', 0);
        this.widget = comboBox;
        this.model = model;
        this.setOptions(options);
        comboBox.connect('changed', (_entry) => {
            const i = comboBox.get_active();
            if (!this._options) {
                throw new Error();
            }
            if (i in this._options) {
                this.emit('changed', this._options[i].value);
            }
        });
    }
    setOptions(options) {
        this.model.clear();
        this._options = options || [];
        this._options.forEach((o) => {
            let iter;
            this.model.set((iter = this.model.append()), [this.Columns.LABEL], [o.label]);
            if (o.active) {
                this.widget.set_active_iter(iter);
            }
        });
    }
};
ComboBoxView = __decorate([
    registerGObjectClass
], ComboBoxView);
class BaseProviderConfigView {
    gettext;
    _api;
    _provider;
    _configWidget;
    _indicatorConfig;
    _widgets;
    constructor(gettext, api, configWidget, indicatorConfig) {
        this.gettext = gettext;
        this._api = api;
        this._provider = getProvider(api);
        this._configWidget = configWidget;
        this._indicatorConfig = indicatorConfig;
        this._widgets = [];
        this._setDefaults(indicatorConfig);
        this._setApiDefaults(indicatorConfig);
        this._initWidgets();
    }
    _initWidgets() {
        this._addBaseEntry();
        this._addQuoteEntry();
        this._addHelp();
    }
    _setDefaults(config) {
        config.set('show_change', config.get('show_change') !== false);
    }
    _setApiDefaults(config) {
        if (config.get('api') !== this._api) {
            config.set('api', this._api);
        }
    }
    _addConfigWidget(w) {
        this._configWidget.append(w);
        this._widgets.push(w);
    }
    _addRow(label, widget) {
        const rowWidget = makeConfigRow(label, widget);
        this._addConfigWidget(rowWidget);
        return rowWidget;
    }
    _addBaseEntry() {
        return this._addSymbolEntry(this.gettext('Base'), 'base', 'BTC');
    }
    _addQuoteEntry() {
        return this._addSymbolEntry(this.gettext('Quote'), 'quote', 'USD');
    }
    _addSymbolEntry(label, key, defaultValue) {
        const entry = new Gtk.Entry({
            text: this._indicatorConfig.get(key) || defaultValue,
        });
        entry.connect('changed', debounce(500, () => {
            if (!entry.text) {
                throw new Error();
            }
            if (entry.text.length < 2) {
                return;
            }
            this._indicatorConfig.set(key, entry.text.toUpperCase());
        }));
        const rowWidget = this._addRow(label, entry);
        return { rowWidget, entry };
    }
    _addHelp() {
        const { apiDocs } = this._provider;
        if (!apiDocs) {
            return console.log(new Error(`no apiDocs for ${this._api}`));
        }
        const helpText = apiDocs.map(([label, url]) => `<a href="${url}">${label}</a>`).join(', ');
        this._addRow(this.gettext('Help'), new Gtk.Label({
            label: helpText,
            use_markup: true,
        }));
        /*
        apiDocs.forEach(([label, url]) => {
          this._addConfigWidget(
            new Gtk.Label({
              label: `<a href="${url}">${label}</a>`,
              use_markup: true,
              margin_bottom: 8
            })
          );
        });
        */
    }
    destroy() {
        this._widgets.forEach((widget) => this._configWidget.remove(widget));
        this._widgets.slice(0);
    }
}

var BaseProviderConfigView$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    makeConfigRow: makeConfigRow,
    get ComboBoxView () { return ComboBoxView; },
    BaseProviderConfigView: BaseProviderConfigView
});

const Defaults = {
    api: 'bitstamp',
    base: 'BTC',
    quote: 'USD',
    attribute: 'last',
    show_change: true,
    format: '{v} {qs}',
};

const INDICATORS_KEY = 'indicators';
class ConfigModel {
    listStore;
    iter;
    column;
    attributes;
    constructor(listStore, iter, column = 1) {
        this.listStore = listStore;
        this.iter = iter;
        this.column = column;
        this.attributes = JSON.parse(this.listStore.get_value(iter, this.column));
    }
    set(key, value) {
        this.attributes[key] = value;
        this.listStore.set(this.iter, [this.column], [JSON.stringify(this.attributes)]);
    }
    get(key) {
        if (key in this.attributes) {
            return this.attributes[key];
        }
        return Defaults[key];
    }
}
let IndicatorCollectionModel = class IndicatorCollectionModel extends Gtk.ListStore {
    _settings;
    Columns = {};
    constructor(settings) {
        super();
        this.Columns = {
            LABEL: 0,
            CONFIG: 1,
        };
        this.set_column_types([GObject.TYPE_STRING, GObject.TYPE_STRING]);
        this._settings = settings;
        this._reloadFromSettings();
        let flag;
        const mutex = (func) => function (...args) {
            if (!flag) {
                flag = true;
                func(...args);
                flag = false;
            }
        };
        this.connect('row-changed', mutex(this._onRowChanged.bind(this)));
        this.connect('row-inserted', mutex(this._onRowInserted.bind(this)));
        this.connect('row-deleted', mutex(this._onRowDeleted.bind(this)));
    }
    getConfig(iter) {
        return new ConfigModel(this, iter, this.Columns.CONFIG);
    }
    _getLabel(config) {
        try {
            return getProvider(config.api).getLabel(config);
        }
        catch (e) {
            console.log(e);
            return `[unsupported: ${config.api}]`;
        }
    }
    _reloadFromSettings() {
        this.clear();
        const configs = this._settings.get_strv(INDICATORS_KEY);
        Object.keys(configs).forEach((key) => {
            const json = configs[key];
            try {
                const label = this._getLabel(JSON.parse(json));
                this.set(this.append(), [this.Columns.LABEL, this.Columns.CONFIG], [label, json]);
            }
            catch (e) {
                console.log('error loading indicator config');
                console.error(e);
            }
        });
    }
    _writeSettings() {
        // eslint-disable-next-line
        let [res, iter] = this.get_iter_first();
        const configs = [];
        while (res) {
            configs.push(this.get_value(iter, this.Columns.CONFIG));
            res = this.iter_next(iter);
        }
        this._settings.set_strv(INDICATORS_KEY, configs);
    }
    _onRowChanged(self, path, iter) {
        const config = this.get_value(iter, this.Columns.CONFIG);
        this.set(iter, [this.Columns.LABEL, this.Columns.CONFIG], [
            this._getLabel(JSON.parse(config)),
            config,
        ]);
        this._writeSettings();
    }
    _onRowInserted(self, path, iter) {
        this.set(iter, [this.Columns.LABEL, this.Columns.CONFIG], [
            this._getLabel(Defaults),
            JSON.stringify(Defaults),
        ]);
        this._writeSettings();
    }
    _onRowDeleted(_self, _path, _iter) {
        this._writeSettings();
    }
};
IndicatorCollectionModel = __decorate([
    registerGObjectClass
], IndicatorCollectionModel);

const { ComboBoxView: ComboBoxView$1, makeConfigRow: makeConfigRow$1 } = BaseProviderConfigView$1;
function getMarginAll(v) {
    return {
        margin_start: v,
        margin_top: v,
        margin_end: v,
        margin_bottom: v,
    };
}
class IndicatorConfigView {
    gettext;
    widget;
    _indicatorConfig;
    _layoutIndicatorSettings;
    _layoutProviderSettings;
    _apiConfigView;
    constructor(gettext, indicatorConfig) {
        this.gettext = gettext;
        const margin = 8;
        this._indicatorConfig = indicatorConfig;
        this.widget = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
        });
        {
            const frame = new Gtk.Frame({
                label: this.gettext('Indicator Settings'),
                ...getMarginAll(margin),
            });
            this._layoutIndicatorSettings = new Gtk.Box({
                orientation: Gtk.Orientation.VERTICAL,
                ...getMarginAll(margin),
            });
            frame.set_child(this._layoutIndicatorSettings);
            this.widget.append(frame);
        }
        {
            const frame = new Gtk.Frame({
                label: this.gettext('Provider Settings'),
                ...getMarginAll(margin),
            });
            this._layoutProviderSettings = new Gtk.Box({
                orientation: Gtk.Orientation.VERTICAL,
                ...getMarginAll(margin),
            });
            frame.set_child(this._layoutProviderSettings);
            this.widget.append(frame);
        }
        this._addIndicatorSettings();
        this._selectApi(indicatorConfig.get('api'));
    }
    _addIndicatorSettings() {
        const layout = this._layoutIndicatorSettings;
        layout.append(this._confFormat());
        layout.append(this._confShowChange());
        layout.append(this._confProvider());
    }
    _selectApi(api) {
        const widget = this._layoutProviderSettings;
        const config = this._indicatorConfig;
        if (this._apiConfigView) {
            this._apiConfigView.destroy();
            this._apiConfigView = undefined;
        }
        try {
            this._apiConfigView = new BaseProviderConfigView(this.gettext, api, widget, config);
        }
        catch (e) {
            e.message = `Error creating configView for api ${api}: ${e.message}`;
            console.error(e);
        }
    }
    _confFormat() {
        const format = this._indicatorConfig.get('format');
        const entry = new Gtk.Entry({
            text: format,
            tooltip_markup: tooltipText(this.gettext),
        });
        entry.connect('changed', () => {
            this._indicatorConfig.set('format', entry.text);
        });
        return makeConfigRow$1(this.gettext('Format'), entry);
    }
    _confProvider() {
        const preset = this._indicatorConfig.get('api');
        const options = Object.keys(Providers).map((name) => ({
            value: name,
            label: getProvider(name).apiName,
            active: false,
        }));
        options.forEach((o) => {
            if (o.value === preset) {
                o.active = true;
            }
        });
        const view = new ComboBoxView$1(options);
        view.connect('changed', (view, api) => this._selectApi(api));
        return makeConfigRow$1(this.gettext('Provider'), view.widget);
    }
    _confShowChange() {
        const preset = this._indicatorConfig.get('show_change') !== false;
        const switchView = new Gtk.Switch({ active: preset });
        switchView.connect('notify::active', (obj) => {
            this._indicatorConfig.set('show_change', obj.active);
        });
        return makeConfigRow$1(this.gettext('Show Change'), switchView);
    }
    _confShowBaseCurrency() {
        const preset = this._indicatorConfig.get('show_base_currency') === true;
        const switchView = new Gtk.Switch({ active: preset });
        switchView.connect('notify::active', (obj) => {
            this._indicatorConfig.set('show_base_currency', obj.active);
        });
        return makeConfigRow$1(this.gettext('Show Base Currency'), switchView);
    }
}
let BitcoinMarketsSettingsWidget = class BitcoinMarketsSettingsWidget extends Gtk.Box {
    gettext;
    _store;
    _configLayout;
    _treeView;
    _selection;
    _toolbar;
    _delButton;
    _indicatorConfigView = null;
    constructor(ext) {
        super({
            orientation: Gtk.Orientation.HORIZONTAL,
        });
        this.gettext = ext.gettext.bind(ext);
        this._store = new IndicatorCollectionModel(ext.getSettings());
        /* sidebar (left) */
        const sidebar = new Gtk.Box({
            margin_start: 10,
            margin_end: 10,
            margin_top: 10,
            margin_bottom: 10,
            orientation: Gtk.Orientation.VERTICAL,
            width_request: 240,
        });
        sidebar.append(this._getTreeView());
        sidebar.append(this._getToolbar());
        this.append(sidebar);
        /* config (right) */
        this._configLayout = new Gtk.Box({
            // margin: 10,
            orientation: Gtk.Orientation.HORIZONTAL,
            hexpand: true,
            vexpand: true,
        });
        this.append(this._configLayout);
        /* behavior */
        this._selection = this._treeView.get_selection();
        this._selection.connect('changed', this._onSelectionChanged.bind(this));
    }
    _getTreeView() {
        this._treeView = new Gtk.TreeView({
            model: this._store,
            headers_visible: false,
            reorderable: true,
            hexpand: false,
            vexpand: true,
        });
        const label = new Gtk.TreeViewColumn({ title: 'Label' });
        const renderer = new Gtk.CellRendererText();
        label.pack_start(renderer, true);
        label.add_attribute(renderer, 'text', 0);
        this._treeView.insert_column(label, 0);
        return this._treeView;
    }
    _getToolbar() {
        const toolbar = (this._toolbar = new Gtk.Box({}));
        /* new widget button with menu */
        const newButton = new Gtk.Button({ icon_name: 'list-add-symbolic' });
        newButton.connect('clicked', this._addClicked.bind(this));
        toolbar.append(newButton);
        /* delete button */
        const delButton = (this._delButton = new Gtk.Button({ icon_name: 'list-remove-symbolic' }));
        delButton.connect('clicked', this._delClicked.bind(this));
        toolbar.append(delButton);
        this._updateToolbar();
        return toolbar;
    }
    _onSelectionChanged() {
        const [isSelected, , iter] = this._selection.get_selected();
        if (isSelected) {
            this._showIndicatorConfig(this._store.getConfig(iter));
        }
        else {
            this._showIndicatorConfig(null);
        }
        this._updateToolbar();
    }
    _showIndicatorConfig(indicatorConfig) {
        if (this._indicatorConfigView) {
            this._configLayout.remove(this._indicatorConfigView.widget);
            this._indicatorConfigView = null;
        }
        if (indicatorConfig === null) {
            return;
        }
        this._indicatorConfigView = new IndicatorConfigView(this.gettext, indicatorConfig);
        this._configLayout.append(this._indicatorConfigView.widget);
    }
    _updateToolbar() {
        let sensitive = false;
        if (this._selection) {
            const [isSelected] = this._selection.get_selected();
            sensitive = isSelected;
        }
        this._delButton.set_sensitive(sensitive);
    }
    _addClicked() {
        this._store.append();
        this._updateToolbar();
    }
    _delClicked() {
        const [isSelected, , iter] = this._selection.get_selected();
        if (!iter) {
            throw new Error();
        }
        if (isSelected) {
            this._store.remove(iter);
        }
        this._updateToolbar();
    }
};
BitcoinMarketsSettingsWidget = __decorate([
    registerGObjectClass
], BitcoinMarketsSettingsWidget);
class BitcoinMarketsSettings extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const page = new Adw.PreferencesPage();
        const group = new Adw.PreferencesGroup();
        const gtkWidget = new BitcoinMarketsSettingsWidget(this);
        group.add(gtkWidget);
        page.add(group);
        window.add(page);
    }
}

export default BitcoinMarketsSettings;
