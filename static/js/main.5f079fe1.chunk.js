(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{54:function(e,t,a){},55:function(e,t,a){},61:function(e,t,a){"use strict";a.r(t);var c,n=a(0),o=a.n(n),r=a(23),i=a.n(r),l=(a(54),a(55),a(78)),s=a(37),u=a(21),d=a(79),p=a(80),g=a(81),b=a(7);!function(e){e.InitializeGame="InitializeGame",e.MoveCardStartingCard="MoveCardStartingCard",e.MoveCardSplitDeck="MoveCardSplitDeck",e.MoveCardTopRight="MoveCardTopRight",e.UpdateSplitDeck="UpdateSplitDeck"}(c||(c={}));var m=a(24),j=["\u2660\ufe0e","\u2665\ufe0e","\u2663\ufe0e","\u2666\ufe0e"],h=["A","2","3","4","5","6","7","8","9","10","J","Q","K"],f=[1,2,3,4,5,6,7,8,9,10,11,12,13];function v(){for(var e=function(){for(var e=[],t=function(){var e,t=[],a=Object(m.a)(j);try{for(a.s();!(e=a.n()).done;)for(var c=e.value,n=0;n<h.length;n++)t.push({suit:c,value:h[n],numValue:f[n],discovered:!0,column:-1,pos:-1,isTop:!1,isInGlobal:!0})}catch(o){a.e(o)}finally{a.f()}return t}(),a=0;a<7;a++){for(var c=[],n=0;n<=a;n++){var o=Math.floor(Math.random()*t.length),r=t[o];t.splice(o,1),r.column=a,r.pos=n,r.isInGlobal=!1,r.discovered=!1,n===a&&(r.discovered=!0),c.push(r)}e.push(c)}return{startingDeck:e,globalDeck:t}}(),t=[],a=0;e.globalDeck.length;){var c=[];c=e.globalDeck.length-3>0?e.globalDeck.splice(e.globalDeck.length-3,3):e.globalDeck.splice(0,e.globalDeck.length);for(var n=0;n<c.length;n++)c[n].pos=n,c[n].column=a;t.push(c),a++}return{splitDeck:t,startingDeck:e.startingDeck}}function D(e,t){if(""===t.suit&&""===t.value&&-1===t.pos)return!0;if("\u2665\ufe0e"===t.suit||"\u2666\ufe0e"===t.suit){if(e.numValue+1===t.numValue&&("\u2663\ufe0e"===e.suit||"\u2660\ufe0e"===e.suit))return!0}else if(e.numValue+1===t.numValue&&("\u2665\ufe0e"===e.suit||"\u2666\ufe0e"===e.suit))return!0;return console.log("INVALID MOVE"),!1}function k(e,t){return""===t.suit&&""===t.value&&"A"===e.value||(console.log("First card must be A"),e.numValue===t.numValue+1&&e.suit===t.suit||(console.log("Selected card must be same suit and one value higher"),console.log("INVALID MOVE"),!1))}var x=a(2),O=.7191,y=Object(d.a)({card:{display:"flex",width:"100px",height:"139.06271728549578px",borderRadius:"8px",padding:"0px 4px 0px 4px",backgroundColor:"white",border:"3px solid black"},cardbg:{display:"flex",width:"94px",height:94/O+"px",borderRadius:"8px",border:"3px solid black",backgroundImage:"url(/solitaire/background2.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"},cardtl:{display:"flex",alignItems:"flex-start"},cardbr:{display:"flex",alignItems:"flex-start",transform:"rotate(-180deg)"},cardValue:{fontSize:"30px"},cardSuit:{fontSize:"30px"},red:{color:"red"},black:{color:"black"},bgImg:{height:"100%"}}),C=o.a.memo((function(e){var t=y(),a=Object(b.b)();var n=Object(p.a)({accept:"Card",drop:function(){return{props:e.card}}}),o=Object(u.a)(n,2);Object(s.a)(o[0]);var r=o[1],i=Object(g.a)({type:"Card",item:function(){return{card:e.card}},end:function(e,t){var n=t.getDropResult();if(e&&n){var o=e.card,r=n.props;if(void 0===o||void 0===r||o.pos===r.pos&&o.column===r.column)console.log("Something is undefined in useDrag or Cant drop a card on is self");else{var i={fromCard:e.card,toCard:n.props};r.isTop&&!o.isInGlobal&&k(o,r)?(console.log("You dropped ".concat(o.value,", ").concat(o.suit," into topRightDeck ").concat(r.value,", ").concat(r.suit)),a(function(e){return{type:c.MoveCardTopRight,payload:e}}(i))):o.isInGlobal&&function(e,t){return t.isTop?k(e,t):D(e,t)}(o,r)?(console.log("You dropped ".concat(o.value,", ").concat(o.suit," from splitDeck into ").concat(r.value,", ").concat(r.suit)),a(function(e){return{type:c.MoveCardSplitDeck,payload:e}}(i))):!r.isTop&&D(o,r)&&(console.log("You dropped ".concat(o.value,", ").concat(o.suit," into ").concat(r.value,", ").concat(r.suit)),a(function(e){return{type:c.MoveCardStartingCard,payload:e}}(i)))}}},collect:function(e){return{isDragging:e.isDragging()}}}),d=Object(u.a)(i,3),m=(d[0].isDragging,d[1]);d[2];return!1===e.turned||""===e.card.suit?Object(x.jsx)(x.Fragment,{children:Object(x.jsxs)(l.a,{ref:function(t){e.canDrop&&r(t),e.canDrag&&m(t)},container:!0,direction:"row",className:t.card,style:{color:"\u2665\ufe0e"===e.card.suit||"\u2666\ufe0e"===e.card.suit?"red":"black",border:""===e.card.suit?"2px solid rgba(0, 0, 0, 0.3)":"3px solid rgba(0, 0, 0)",display:e.display?"":"none",cursor:e.canDrag?"pointer":void 0},children:[Object(x.jsxs)(l.a,{container:!0,direction:"row",justify:"flex-start",alignItems:"flex-start",className:t.cardtl,children:[Object(x.jsx)(l.a,{item:!0,className:t.cardValue,children:e.card.value}),Object(x.jsx)(l.a,{item:!0,className:t.cardSuit,children:e.card.suit})]}),Object(x.jsxs)(l.a,{container:!0,direction:"row",justify:"flex-start",alignItems:"flex-start",className:t.cardbr,children:[Object(x.jsx)(l.a,{item:!0,className:t.cardValue,children:e.card.value}),Object(x.jsx)(l.a,{item:!0,className:t.cardSuit,children:e.card.suit})]})]})}):Object(x.jsx)(x.Fragment,{children:Object(x.jsx)(l.a,{container:!0,style:{},children:Object(x.jsx)("div",{className:t.cardbg})})})})),I=function(e){return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(l.a,{item:!0,style:{position:"static",top:"0px"},children:Object(x.jsx)(C,{card:{suit:"",value:"",numValue:-1,discovered:!1,column:e.column,pos:-1,isTop:!1,isInGlobal:!1},canDrag:!1,canDrop:!0,display:!0,turned:!1})}),e.cards.length>0?e.cards.map((function(t,a){return Object(x.jsx)(l.a,{item:!0,style:{position:"absolute",top:0===t.pos?"0px":43*t.pos+"px"},children:Object(x.jsx)(C,{card:t,turned:!t.discovered,display:!0,canDrop:a===e.cards.length-1,canDrag:t.discovered})},a)})):Object(x.jsx)(x.Fragment,{children:" "})]})},S=function(e){return Object(x.jsx)(l.a,{container:!0,direction:"row",alignItems:"flex-start",justify:"space-between",children:e.startingDeck.map((function(e,t){return Object(x.jsx)(l.a,{item:!0,style:{position:"relative"},children:Object(x.jsx)(I,{cards:e,column:t})},t)}))})},w=a(77),V=a(44),R=a(45),T=a(12),G={startingDeck:[],splitDeck:[],topRightDeck:[]},M=function(e){return e.startingDeck},N=function(e){return e.splitDeck},E=function(e){return e.topRightDeck};var _=function(e){var t=Object(n.useState)(-1),a=Object(u.a)(t,2),o=a[0],r=a[1],i=Object(b.c)(N),s=Object(b.b)();return Object(x.jsxs)(l.a,{container:!0,direction:"row",justify:"space-between",children:[Object(x.jsx)(l.a,{item:!0,onClick:function(){o>=e.splitDeck.length-1?(s({type:c.UpdateSplitDeck}),r(-1)):r(o+1),console.log(o)},children:Object(x.jsx)(C,{card:{suit:"bg",value:"",numValue:-1,discovered:!1,column:-1,pos:-1,isTop:!1,isInGlobal:!1},turned:!0,display:!0,canDrop:!1,canDrag:!1})}),Object(x.jsx)(l.a,{item:!0,style:{width:"100px"},children:Object(x.jsx)(l.a,{container:!0,direction:"row",style:{position:"relative"},children:o>-1?i[o].map((function(e,t){return Object(x.jsx)(l.a,{item:!0,style:{position:"absolute",left:50*t+"px"},children:Object(x.jsx)(C,{card:e,turned:!1,display:!0,canDrop:!1,canDrag:t===i[o].length-1})},t)})):""})}),Object(x.jsx)(l.a,{item:!0,style:{width:"100px"}}),e.topRightDeck.map((function(e,t){return Object(x.jsx)(l.a,{item:!0,children:Object(x.jsx)(C,{card:e[e.length-1],turned:!1,display:!0,canDrop:!0,canDrag:!1})},t)}))]})};var z=function(){var e=Object(b.b)(),t=Object(b.c)(M),a=Object(b.c)(N),o=Object(b.c)(E);return Object(n.useEffect)((function(){var t,a=v();e((t={startingDeck:a.startingDeck,splitDeck:a.splitDeck,topRightDeck:[[{suit:"",value:"",numValue:-1,discovered:!1,column:0,pos:-1,isTop:!0,isInGlobal:!1}],[{suit:"",value:"",numValue:-1,discovered:!1,column:1,pos:-1,isTop:!0,isInGlobal:!1}],[{suit:"",value:"",numValue:-1,discovered:!1,column:2,pos:-1,isTop:!0,isInGlobal:!1}],[{suit:"",value:"",numValue:-1,discovered:!1,column:3,pos:-1,isTop:!0,isInGlobal:!1}]]},{type:c.InitializeGame,payload:t})),console.log("Board initialized")}),[]),Object(x.jsx)("div",{className:"App",children:Object(x.jsx)(w.a,{backend:V.a,children:Object(x.jsxs)(l.a,{container:!0,spacing:8,direction:"column",style:{margin:"20px 18vw 20px 18vw"},children:[Object(x.jsx)(l.a,{item:!0,children:Object(x.jsx)(_,{topRightDeck:o,splitDeck:a})}),Object(x.jsx)(l.a,{item:!0,children:Object(x.jsx)(S,{startingDeck:t})})]})})})},A=a(11),U=Object(A.b)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case c.MoveCardStartingCard:return Object(T.a)(e,(function(e){var a,c=t.payload.fromCard,n=t.payload.toCard,o=e.startingDeck[c.column].splice(c.pos,e.startingDeck[c.column].length-c.pos),r=Object(m.a)(o);try{for(r.s();!(a=r.n()).done;){var i=a.value;0===e.startingDeck[n.column].length?i.pos=0:i.pos=e.startingDeck[n.column].length,i.column=n.column,e.startingDeck[n.column].push(i)}}catch(l){r.e(l)}finally{r.f()}e.startingDeck[c.column].length>0&&(e.startingDeck[c.column][c.pos-1].discovered=!0)}));case c.MoveCardSplitDeck:return Object(T.a)(e,(function(e){var a=t.payload.toCard,c=e.splitDeck[t.payload.fromCard.column].splice(t.payload.fromCard.pos)[0];c.column=a.column,c.pos=a.pos+1,a.isTop?(c.isTop=!0,c.isInGlobal=!1,e.topRightDeck[a.column].push(c)):(c.isInGlobal=!1,e.startingDeck[a.column].push(c))}));case c.MoveCardTopRight:var a=t.payload.fromCard;return e.startingDeck[a.column].length-1===a.pos?Object(T.a)(e,(function(e){var c=e.startingDeck[a.column].splice(a.pos)[0];e.startingDeck[a.column].length>0&&(e.startingDeck[a.column][a.pos-1].discovered=!0),c.isTop=!0,c.column=t.payload.toCard.column,e.topRightDeck[t.payload.toCard.column].push(c)})):e;case c.UpdateSplitDeck:return console.log("Resetting splitdeck"),Object(T.a)(e,(function(e){for(var t=Object(R.a)(e.splitDeck),a=[],c=0;c<t.length;c++)a=t[c].concat(a);t=[];for(var n=0;a.length;){var o=[];o=a.length-3>0?a.splice(a.length-3,3):a.splice(0,a.length);for(var r=0;r<o.length;r++)o[r].pos=r,o[r].column=n;t.push(o),n++}e.splitDeck=t}));case c.InitializeGame:return console.log("Initializing Game"),Object(T.a)(e,(function(e){e.startingDeck=t.payload.startingDeck,e.splitDeck=t.payload.splitDeck,e.topRightDeck=t.payload.topRightDeck}));default:return e}}),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());i.a.render(Object(x.jsx)(b.a,{store:U,children:Object(x.jsx)(o.a.StrictMode,{children:Object(x.jsx)(z,{})})}),document.getElementById("root"))}},[[61,1,2]]]);
//# sourceMappingURL=main.5f079fe1.chunk.js.map