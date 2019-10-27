'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.default = {
    date(format, timestamp) {
        //  discuss at: http://phpjs.org/functions/date/
        // original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
        // original by: gettimeofday
        //    parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: MeEtc (http://yass.meetcweb.com)
        // improved by: Brad Touesnard
        // improved by: Tim Wiel
        // improved by: Bryan Elliott
        // improved by: David Randall
        // improved by: Theriault
        // improved by: Theriault
        // improved by: Brett Zamir (http://brett-zamir.me)
        // improved by: Theriault
        // improved by: Thomas Beaucourt (http://www.webapp.fr)
        // improved by: JT
        // improved by: Theriault
        // improved by: Rafał Kukawski (http://blog.kukawski.pl)
        // improved by: Theriault
        //    input by: Brett Zamir (http://brett-zamir.me)
        //    input by: majak
        //    input by: Alex
        //    input by: Martin
        //    input by: Alex Wilson
        //    input by: Haravikk
        // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfixed by: majak
        // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfixed by: Brett Zamir (http://brett-zamir.me)
        // bugfixed by: omid (http://phpjs.org/functions/380:380#comment_137122)
        // bugfixed by: Chris (http://www.devotis.nl/)
        //        note: Uses global: php_js to store the default timezone
        //        note: Although the function potentially allows timezone info (see notes), it currently does not set
        //        note: per a timezone specified by date_default_timezone_set(). Implementers might use
        //        note: this.php_js.currentTimezoneOffset and this.php_js.currentTimezoneDST set by that function
        //        note: in order to adjust the dates in this function (or our other date functions!) accordingly
        //   example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400)
        //   returns 1: '09:09:40 m is month'
        //   example 2: date('F j, Y, g:i a', 1062462400)
        //   returns 2: 'September 2, 2003, 2:26 am'
        //   example 3: date('Y W o', 1062462400)
        //   returns 3: '2003 36 2003'
        //   example 4: x = date('Y m d', (new Date()).getTime()/1000)
        //   example 4: (x+'').length == 10 // 2009 01 09
        //   returns 4: true
        //   example 5: date('W', 1104534000)
        //   returns 5: '53'
        //   example 6: date('B t', 1104534000)
        //   returns 6: '999 31'
        //   example 7: date('W U', 1293750000.82) // 2010-12-31
        //   returns 7: '52 1293750000'
        //   example 8: date('W', 1293836400) // 2011-01-01
        //   returns 8: '52'
        //   example 9: date('W Y-m-d', 1293974054) // 2011-01-02
        //   returns 9: '52 2011-01-02'
        // var that = this
        var jsdate, f
        // Keep this here (works, but for code commented-out below for file size reasons)
        // var tal= []
        var txtWords = [
            'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
            'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
            'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
        ]
        // trailing backslash -> (dropped)
        // a backslash followed by any character (including backslash) -> the character
        // empty string -> empty string
        var formatChr = /\\?(.?)/gi
        var formatChrCb = (t, s) => {
            return f[t] ? f[t]() : s
        }
        var _pad = (n, c) => {
            n = String(n)
            while (n.length < c) {
                n = '0' + n
            }
            return n
        }
        f = {
            d: () => {
                return _pad(f.j(), 2)
            },
            D:  () => {
                return f.l()
                    .slice(0, 3)
            },
            j: () => {
                return jsdate.getDate()
            },
            l: () => {
                return txtWords[f.w()] + 'day'
            },
            N: () => {
                return f.w() || 7
            },
            S: () => {
                var j = f.j()
                var i = j % 10
                if (i <= 3 && Math.floor((j % 100) / 10) == 1) {
                    i = 0
                }
                return ['st', 'nd', 'rd'][i - 1] || 'th'
            },
            w: () => {
                return jsdate.getDay()
            },
            z: () => {
                var a = new Date(f.Y(), f.n() - 1, f.j())
                var b = new Date(f.Y(), 0, 1)
                return Math.round((a.getTime() - b.getTime()) / 864e5)
            },
            // Week
            W: () => {
                var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3)
                var b = new Date(a.getFullYear(), 0, 4)
                return _pad(1 + Math.round((a.getTime() - b.getTime()) / 864e5 / 7), 2)
            },
            // Month
            F: () => {
                return txtWords[6 + f.n()]
            },
            m: () => {
                return _pad(f.n(), 2)
            },
            M: () => {
                return f.F()
                    .slice(0, 3)
            },
            n: () => {
                return jsdate.getMonth() + 1
            },
            t: () => {
                return (new Date(f.Y(), f.n(), 0))
                    .getDate()
            },
            // Year
            L: () => {
                var j = f.Y()
                return (j % 4 === 0 ? 1 : 0) & (j % 100 !== 0 ? 1 : 0) | (j % 400 === 0 ? 1 : 0)
            },
            o: () => {
                var n = f.n()
                var W = f.W()
                var Y = f.Y()
                return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0)
            },
            Y: () => {
                return jsdate.getFullYear()
            },
            y: () => {
                return f.Y()
                    .toString()
                    .slice(-2)
            },
            // Time
            a: () => {
                return jsdate.getHours() > 11 ? 'pm' : 'am'
            },
            A: () => {
                return f.a()
                    .toUpperCase()
            },
            B: () => {
                var H = jsdate.getUTCHours() * 36e2
                // Hours
                var i = jsdate.getUTCMinutes() * 60
                // Minutes
                var s = jsdate.getUTCSeconds() // Seconds
                return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3)
            },
            g: () => {
                return f.G() % 12 || 12
            },
            G: () => {
                return jsdate.getHours()
            },
            h: () => {
                return _pad(f.g(), 2)
            },
            H: () => {
                return _pad(f.G(), 2)
            },
            i: () => {
                return _pad(jsdate.getMinutes(), 2)
            },
            s: () => {
                return _pad(jsdate.getSeconds(), 2)
            },
            u: () => {
                return _pad(jsdate.getMilliseconds() * 1000, 6)
            },
            // Timezone
            e: () => {
                // The following works, but requires inclusion of the very large
                // timezone_abbreviations_list() function.
                /*              return that.date_default_timezone_get()
                 */
                throw 'Not supported (see source code of date() for timezone on how to add support)'
            },
            I: () => {
                // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
                // If they are not equal, then DST is observed.
                var a = new Date(f.Y(), 0)
                // Jan 1
                var c = Date.UTC(f.Y(), 0)
                // Jan 1 UTC
                var b = new Date(f.Y(), 6)
                // Jul 1
                var d = Date.UTC(f.Y(), 6) // Jul 1 UTC
                return ((a.getTime() - c) !== (b.getTime() - d)) ? 1 : 0
            },
            O: () => {
                var tzo = jsdate.getTimezoneOffset()
                var a = Math.abs(tzo)
                return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4)
            },
            P: () => {
                var O = f.O()
                return (O.substr(0, 3) + ':' + O.substr(3, 2))
            },
            T: () => {
                // The following works, but requires inclusion of the very
                // large timezone_abbreviations_list() function.
                /*              var abbr, i, os, _default
                if (!tal.length) {
                  tal = that.timezone_abbreviations_list()
                }
                if (that.php_js && that.php_js.default_timezone) {
                  _default = that.php_js.default_timezone
                  for (abbr in tal) {
                    for (i = 0 i < tal[abbr].length i++) {
                      if (tal[abbr][i].timezone_id === _default) {
                        return abbr.toUpperCase()
                      }
                    }
                  }
                }
                for (abbr in tal) {
                  for (i = 0 i < tal[abbr].length i++) {
                    os = -jsdate.getTimezoneOffset() * 60
                    if (tal[abbr][i].offset === os) {
                      return abbr.toUpperCase()
                    }
                  }
                }
                */
                return 'UTC'
            },
            Z: () => {
                return -jsdate.getTimezoneOffset() * 60
            },
            // Full Date/Time
            c: () => {
                return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb)
            },
            r: () => {
                return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb)
            },
            U: () => {
                return jsdate / 1000 | 0
            },
        }
        this.date = (format, timestamp) => {
            that = this
            jsdate = (timestamp === undefined ? new Date() : // Not provided
                (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
                    new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
            )
            return format.replace(formatChr, formatChrCb)
        }
        return this.date(format, timestamp)
    },
}
//# sourceMappingURL=routines.js.map