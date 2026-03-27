"use client";

import Script from "next/script";
import { siteConfig } from "@/config/site";

export function Scripts() {
  return (
    <>
      <Script id="twitter-widgets" strategy="lazyOnload">
        {`
          !function(){
            var d=document,s='script',fjs;
            function el(t){return d.getElementsByTagName(t)}
            fjs=el(s)[0];
            function ex(i){return d.getElementById(i)}
            function scr(i,src){var r=d.createElement(s);r.id=i;r.src=src;return r}
            function ins(s){fjs.parentNode.insertBefore(s,fjs)}
            !function(id){if(!ex(id)){ins(scr(id,"//platform.twitter.com/widgets.js"))}}("twitter-wjs");
          }();
        `}
      </Script>
      <Script id="gauges-tracker" strategy="lazyOnload">
        {`
          !function(){
            var d=document,s='script',fjs;
            function el(t){return d.getElementsByTagName(t)}
            fjs=el(s)[0];
            function ex(i){return d.getElementById(i)}
            function scr(i,src){var r=d.createElement(s);r.id=i;r.src=src;return r}
            function ins(s){fjs.parentNode.insertBefore(s,fjs)}
            !function(id){var j=scr(id,'//secure.gaug.es/track.js');j.setAttribute('data-site-id','${siteConfig.gaugesSiteId}');ins(j)}('gauges-tracker');
          }();
        `}
      </Script>
    </>
  );
}
