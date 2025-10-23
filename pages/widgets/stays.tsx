
import Head from 'next/head'
import Headerbar from '@/components/header'
import Script from 'next/script'
import Footer from '@/components/footer'
import React from 'react';
const html = require("../../components/html/stays.html"); 


export default function stays() {
return (
<>  
<br/>
<div dangerouslySetInnerHTML={{ __html: html.default }}>
</div>
</>
);
}
