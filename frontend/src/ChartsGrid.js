import * as React from "react";
import TradingViewWidget, {
  BarStyles,
  Themes,
  IntervalTypes
} from "react-tradingview-widget";

export default function ChartsGrid({
  title,
  tickers,
  chartWidth,
  backgroundColor,
  textColor,
  enabledTA,
  theme
}, {
  title: string,
  tickers: [],
  chartWidth: number,
  // backgroundColor: string,
  // textColor: string,
  enabledTA: boolean,
  // theme: string
}) {
  return (
    <div>
      <h2 style={{ color: textColor }}>{title}</h2>
      <div className="charts" style={{ margin: "0 5px" }}>
        {tickers.map((t) => {
          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3 style={{ color: textColor }}>{t}</h3>
              <div
                className="chart"
                style={{
                  backgroundColor,
                  width: chartWidth - 10,
                  height: chartWidth,
                  marginRight: 5,
                  marginLeft: 5
                  //pointerEvents: enabledTA ? "auto" : "none"
                }}
              >
                <TradingViewWidget
                  autosize
                  symbol={t}
                  allow_symbol_change={false}
                  hide_side_toolbar={!enabledTA}
                  theme={theme}
                  details={false}
                  studies={[
                    "MASimple@tv-basicstudies",
                    "RSI@tv-basicstudies"
                    //"DM@tv-basicstudies"
                  ]}
                  style={BarStyles.CANDLES}
                  range="1M"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
