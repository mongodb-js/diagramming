import{r as g}from"./index-DAF-WbPC.js";import{j as i}from"./jsx-runtime-D_zvdyIk.js";import{u as Ee,F as y,T as xe,j as ve}from"./index-DitojlH1.js";import{M as Me,u as we,a as $e,C,b as R,c as E,z as Ne,n as F,d as ke,P as x,D as $,B as Pe,e as se,g as je,f as Te,h as De,i as Oe,j as Le,S as Se,k as Ce,N as G,l as Re,m as q,o as B}from"./node-DggvwodM.js";import{D as Ve,L as Ie}from"./theme-light-CEMI20gO.js";import"./index-BAMY2Nnw.js";import"./index-BnYophcU.js";import"./index-Ca09g9H1.js";import"./iframe-DdBu4eW8.js";const He=200,Ae=100,ae=()=>{const t=Ee();return i.jsx(Me,{maskColor:t.minimap.mask,nodeColor:t.minimap.node,style:{width:He,height:Ae,background:t.minimap.selectionArea}})};ae.__docgenInfo={description:"",methods:[],displayName:"MiniMap"};const V={duration:500},Fe=F(ke)`
  box-shadow: unset;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: ${E[300]}px;
  font-size: 11px;
  color: ${t=>t.theme.controls.zoomText};
  font-family: ${Ne.code};
`,qe=F.div`
  > .react-flow__controls-button {
    background-color: ${t=>t.theme.controls.background};
    border: 1px solid ${y.gray.base};
    height: ${E[600]+E[100]}px;
    width: ${E[600]+E[100]}px;
    color: ${t=>t.theme.controls.buttonColor};
  }
  > .react-flow__controls-button:hover {
    background-color: ${t=>t.theme.controls.backgroundHover};
  }
  > *:first-of-type {
    border-top-left-radius: ${E[150]}px;
    border-top-right-radius: ${E[150]}px;
  }
  > *:last-of-type {
    border-bottom-left-radius: ${E[150]}px;
    border-bottom-right-radius: ${E[150]}px;
  }
`,re=({title:t})=>{const{zoomIn:e,zoomOut:n,fitView:o}=we(),{zoom:s}=$e();return i.jsxs(Fe,{position:"bottom-left",showFitView:!1,showInteractive:!1,showZoom:!1,children:[i.jsxs(qe,{children:[i.jsx(C,{onClick:()=>e(V),children:i.jsx(R,{glyph:"Plus"})}),i.jsx(C,{onClick:()=>n(V),children:i.jsx(R,{glyph:"Minus"})}),i.jsx(C,{onClick:()=>o(V),children:i.jsx(R,{glyph:"FullScreenEnter"})})]}),`${Math.round(s*100)}%${t?`  ${t}`:""}`]})};re.__docgenInfo={description:"",methods:[],displayName:"Controls",props:{title:{required:!1,tsType:{name:"string"},description:""}}};const Be=(t,e)=>{const n=g.useMemo(()=>t.map(s=>{const{title:r,fields:a,borderVariant:l,disabled:d,connectable:m,...c}=s;return{...c,connectable:m??!1,data:{title:r,disabled:d,fields:a,borderVariant:l}}}),[t]),o=g.useMemo(()=>e.map(s=>({...s,markerStart:`start-${s.markerStart}`,markerEnd:`end-${s.markerEnd}`,type:s.source===s.target?"selfReferencingEdge":"floatingEdge"})),[e]);return{initialNodes:n,initialEdges:o}},W=(t,e)=>{const{width:n,height:o}=t.measured??{width:0,height:0},s=e.position,r=(n??0)/2,a=(o??0)/2,l=t.position.x+r,d=t.position.y+a,m=s.x+r,c=s.y+a,p=(m-l)/(2*r)-(c-d)/(2*a),u=(m-l)/(2*r)+(c-d)/(2*a),h=1/(Math.abs(p)+Math.abs(u)),_=h*p,f=h*u,b=r*(_+f)+l,v=a*(-_+f)+d;return{x:b,y:v}},z=(t,e)=>{var l,d;const n={...t.position,...t},o=Math.round(n.x),s=Math.round(n.y),r=Math.round(e.x),a=Math.round(e.y);return r<=o+1?x.Left:r>=o+(((l=n.measured)==null?void 0:l.width)??0)-1?x.Right:a<=s+1?x.Top:a>=n.y+(((d=n.measured)==null?void 0:d.height)??0)-1?x.Bottom:x.Top},U=(t,{x:e,y:n})=>{const o=$/2;switch(t){case x.Left:return{x:e-o,y:n};case x.Top:return{x:e,y:n-o};case x.Right:return{x:e+o,y:n};case x.Bottom:return{x:e,y:n+o};default:return{x:e,y:n}}},Ye=(t,e)=>{const n=W(t,e),o=W(e,t),s=z(t,n),r=z(e,o),a=U(s,n),l=U(r,o);return{sx:a.x,sy:a.y,tx:l.x,ty:l.y,sourcePos:s,targetPos:r}},K=(t,e)=>t?e==null?void 0:e.replace(/'\)/,"-selected')"):e,Y=({markerStart:t,markerEnd:e,selected:n,...o})=>i.jsx(Pe,{markerEnd:K(n,e),markerStart:K(n,t),style:{stroke:n?y.blue.base:y.gray.base},...o});Y.__docgenInfo={description:"",methods:[],displayName:"Edge",props:{selected:{required:!1,tsType:{name:"boolean"},description:""},path:{required:!0,tsType:{name:"string"},description:""}},composes:["SVGAttributes"]};const ie=({id:t,source:e,target:n,markerEnd:o,markerStart:s,selected:r})=>{const a=se(),{sourceNode:l,targetNode:d}=g.useMemo(()=>{const b=a.find(M=>M.id===e),v=a.find(M=>M.id===n);return{sourceNode:b,targetNode:v}},[a,e,n]);if(!l||!d)return null;const{sx:m,sy:c,tx:p,ty:u,sourcePos:h,targetPos:_}=Ye(l,d),[f]=je({sourceX:m,sourceY:c,sourcePosition:h,targetPosition:_,targetX:p,targetY:u});return i.jsx(Y,{"data-testid":`floating-edge-${t}`,markerEnd:o,markerStart:s,path:f,id:t,selected:r})};ie.__docgenInfo={description:"",methods:[],displayName:"FloatingEdge"};const I=Math.PI,H=2*I,w=1e-6,Xe=H-w;function le(t){this._+=t[0];for(let e=1,n=t.length;e<n;++e)this._+=arguments[e]+t[e]}function Ze(t){let e=Math.floor(t);if(!(e>=0))throw new Error(`invalid digits: ${t}`);if(e>15)return le;const n=10**e;return function(o){this._+=o[0];for(let s=1,r=o.length;s<r;++s)this._+=Math.round(arguments[s]*n)/n+o[s]}}class de{constructor(e){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=e==null?le:Ze(e)}moveTo(e,n){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+n}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(e,n){this._append`L${this._x1=+e},${this._y1=+n}`}quadraticCurveTo(e,n,o,s){this._append`Q${+e},${+n},${this._x1=+o},${this._y1=+s}`}bezierCurveTo(e,n,o,s,r,a){this._append`C${+e},${+n},${+o},${+s},${this._x1=+r},${this._y1=+a}`}arcTo(e,n,o,s,r){if(e=+e,n=+n,o=+o,s=+s,r=+r,r<0)throw new Error(`negative radius: ${r}`);let a=this._x1,l=this._y1,d=o-e,m=s-n,c=a-e,p=l-n,u=c*c+p*p;if(this._x1===null)this._append`M${this._x1=e},${this._y1=n}`;else if(u>w)if(!(Math.abs(p*d-m*c)>w)||!r)this._append`L${this._x1=e},${this._y1=n}`;else{let h=o-a,_=s-l,f=d*d+m*m,b=h*h+_*_,v=Math.sqrt(f),M=Math.sqrt(u),k=r*Math.tan((I-Math.acos((f+u-b)/(2*v*M)))/2),P=k/M,j=k/v;Math.abs(P-1)>w&&this._append`L${e+P*c},${n+P*p}`,this._append`A${r},${r},0,0,${+(p*h>c*_)},${this._x1=e+j*d},${this._y1=n+j*m}`}}arc(e,n,o,s,r,a){if(e=+e,n=+n,o=+o,a=!!a,o<0)throw new Error(`negative radius: ${o}`);let l=o*Math.cos(s),d=o*Math.sin(s),m=e+l,c=n+d,p=1^a,u=a?s-r:r-s;this._x1===null?this._append`M${m},${c}`:(Math.abs(this._x1-m)>w||Math.abs(this._y1-c)>w)&&this._append`L${m},${c}`,o&&(u<0&&(u=u%H+H),u>Xe?this._append`A${o},${o},0,1,${p},${e-l},${n-d}A${o},${o},0,1,${p},${this._x1=m},${this._y1=c}`:u>w&&this._append`A${o},${o},0,${+(u>=I)},${p},${this._x1=e+o*Math.cos(r)},${this._y1=n+o*Math.sin(r)}`)}rect(e,n,o,s){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+n}h${o=+o}v${+s}h${-o}Z`}toString(){return this._}}function ce(){return new de}ce.prototype=de.prototype;const me=({id:t,source:e,markerEnd:n,markerStart:o,selected:s})=>{var X,Z;const r=se(),{sourceNode:a}=g.useMemo(()=>({sourceNode:r.find(be=>be.id===e)}),[r,e]);if(!a)return null;const l=(((X=a.measured)==null?void 0:X.width)||0)/2,d=(((Z=a.measured)==null?void 0:Z.height)||0)/2,m=l+40,c=30,p=d+c,u=a.position.x+l,h=a.position.y-$/2,_=u,f=h-c,b=u+m,v=f,M=b,k=v+p,P=b-m+l+$/2,j=k,N=ce();return N.moveTo(u,h),N.lineTo(_,f),N.lineTo(b,f),N.lineTo(M,k),N.lineTo(P,j),i.jsx(Y,{"data-testid":`self-referencing-edge-${t}`,markerEnd:n,markerStart:o,path:N.toString(),selected:s,id:t})};me.__docgenInfo={description:"",methods:[],displayName:"SelfReferencingEdge"};const ue=({children:t,id:e,...n})=>i.jsx("marker",{id:e,markerHeight:$,markerWidth:$,refX:$/2,refY:$/2,fill:y.gray.base,...n,children:t});ue.__docgenInfo={description:"",methods:[],displayName:"Marker"};const T=t=>g.createElement("svg",{width:15,height:15,viewBox:"0 0 15 15",xmlns:"http://www.w3.org/2000/svg",...t},g.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M6 7V6.99515H6.00982L15 0.357803V1.6008L7.69345 6.99515H15V7V7.99515V8H7.68985L15 13.397V14.64L6.00622 8H6V8.00006H4V13H3V8.00006H0V8V7.00006V7H3V2H4V7H6Z"})),D=t=>g.createElement("svg",{width:15,height:15,viewBox:"0 0 15 15",xmlns:"http://www.w3.org/2000/svg",...t},g.createElement("path",{d:"M6 8.00485V7.99994H0V6.99994H6V7.00485H6.00456L6.00283 7.0025L15 0.359985V1.60299L7.68328 7.00485H15V8.00485H7.69345L15 13.3992V14.6422L6.00982 8.00485H6Z"})),O=t=>g.createElement("svg",{width:15,height:15,viewBox:"0 0 15 15",xmlns:"http://www.w3.org/2000/svg",...t},g.createElement("path",{d:"M4 8V13H3V8L0 8V7L3 7V2H4V7L15 7V8L4 8Z"})),Ge={"start-oneOrMany":{component:i.jsx(T,{}),orient:"auto-start-reverse"},"start-oneOrMany-selected":{component:i.jsx(T,{}),orient:"auto-start-reverse",fill:y.blue.base},"end-oneOrMany":{component:i.jsx(T,{}),orient:"auto"},"end-oneOrMany-selected":{component:i.jsx(T,{}),orient:"auto",fill:y.blue.base},"start-one":{component:i.jsx(O,{}),orient:"auto-start-reverse"},"start-one-selected":{component:i.jsx(O,{}),orient:"auto-start-reverse",fill:y.blue.base},"end-one":{component:i.jsx(O,{}),orient:"auto"},"end-one-selected":{component:i.jsx(O,{}),orient:"auto",fill:y.blue.base},"start-many":{component:i.jsx(D,{}),orient:"auto-start-reverse"},"start-many-selected":{component:i.jsx(D,{}),orient:"auto-start-reverse",fill:y.blue.base},"end-many":{component:i.jsx(D,{}),orient:"auto"},"end-many-selected":{component:i.jsx(D,{}),orient:"auto",fill:y.blue.base}},pe=()=>i.jsx("svg",{children:i.jsx("defs",{children:Object.entries(Ge).map(([t,{component:e,...n}])=>i.jsx(ue,{"data-testid":t,id:t,...n,children:e},t))})});pe.__docgenInfo={description:"",methods:[],displayName:"MarkerList"};const he=({fromX:t,fromY:e,toX:n,toY:o})=>{const[s]=Te({sourceX:t,sourceY:e,targetX:n,targetY:o});return i.jsxs("g",{children:[i.jsx("circle",{cx:t,cy:e,fill:y.blue.base,r:4}),i.jsx("path",{"data-testid":"connection-line",style:{animation:"dashdraw 0.5s linear infinite"},d:s,fill:"none",stroke:y.blue.base,strokeDasharray:5,strokeWidth:2})]})};he.__docgenInfo={description:"",methods:[],displayName:"ConnectionLine"};const We=3,ze=.1,Ue={hideAttribution:!0},Ke=F.div`
  height: 100%;
  background: ${t=>t.theme.background};
`,Qe={table:G,collection:G},Je={floatingEdge:ie,selfReferencingEdge:me},ge=({title:t,nodes:e,edges:n,onConnect:o,id:s,...r})=>{const{initialNodes:a,initialEdges:l}=Be(e,n),[d,m,c]=De(a),[p,u,h]=Oe(l);return g.useEffect(()=>{m(a)},[a]),g.useEffect(()=>{u(l)},[l]),i.jsx(Ke,{children:i.jsxs(Le,{id:s,deleteKeyCode:null,proOptions:Ue,maxZoom:We,minZoom:ze,nodeTypes:Qe,edgeTypes:Je,nodes:d,onlyRenderVisibleElements:!0,edges:p,connectionLineComponent:he,connectionMode:Ce.Loose,onNodesChange:c,onEdgesChange:h,selectionMode:Se.Partial,nodesDraggable:!0,onConnect:o,...r,children:[i.jsx(pe,{}),i.jsx(Re,{id:s}),i.jsx(re,{title:t}),i.jsx(ae,{})]})})};ge.__docgenInfo={description:"",methods:[],displayName:"Canvas",props:{nodes:{required:!0,tsType:{name:"Array",elements:[{name:"intersection",raw:"BaseNodeProps & NodeData",elements:[{name:"Pick",elements:[{name:"ReactFlowNode",elements:[{name:"signature",type:"object",raw:"{}",signature:{properties:[]}},{name:"union",raw:"'table' | 'collection'",elements:[{name:"literal",value:"'table'"},{name:"literal",value:"'collection'"}]}],raw:"ReactFlowNode<{}, NodeType>"},{name:"union",raw:`| 'id'
| 'type'
| 'position'
| 'hidden'
| 'draggable'
| 'connectable'
| 'selected'
| 'selectable'
| 'style'
| 'className'
| 'measured'`,elements:[{name:"literal",value:"'id'"},{name:"literal",value:"'type'"},{name:"literal",value:"'position'"},{name:"literal",value:"'hidden'"},{name:"literal",value:"'draggable'"},{name:"literal",value:"'connectable'"},{name:"literal",value:"'selected'"},{name:"literal",value:"'selectable'"},{name:"literal",value:"'style'"},{name:"literal",value:"'className'"},{name:"literal",value:"'measured'"}]}],raw:`Pick<
  ReactFlowNode<{}, NodeType>,
  | 'id'
  | 'type'
  | 'position'
  | 'hidden'
  | 'draggable'
  | 'connectable'
  | 'selected'
  | 'selectable'
  | 'style'
  | 'className'
  | 'measured'
>`},{name:"signature",type:"object",raw:`{
  title: string;
  disabled?: boolean;
  fields: Array<NodeField>;
  borderVariant?: NodeBorderVariant;
}`,signature:{properties:[{key:"title",value:{name:"string",required:!0}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"fields",value:{name:"Array",elements:[{name:"NodeField"}],raw:"Array<NodeField>",required:!0}},{key:"borderVariant",value:{name:"union",raw:"'subtle' | 'preview' | 'selected' | 'none'",elements:[{name:"literal",value:"'subtle'"},{name:"literal",value:"'preview'"},{name:"literal",value:"'selected'"},{name:"literal",value:"'none'"}],required:!1}}]}}]}],raw:"ExternalNode[]"},description:""},edges:{required:!0,tsType:{name:"Array",elements:[{name:"EdgeProps"}],raw:"EdgeProps[]"},description:""}}};const ye=({isDarkMode:t,...e})=>i.jsx(xe,{theme:t?Ve:Ie,children:i.jsx(ve,{darkMode:t,children:i.jsx(ge,{...e})})});ye.__docgenInfo={description:"",methods:[],displayName:"Diagram",props:{isDarkMode:{required:!1,tsType:{name:"boolean"},description:""},nodes:{required:!0,tsType:{name:"Array",elements:[{name:"intersection",raw:"BaseNodeProps & NodeData",elements:[{name:"Pick",elements:[{name:"ReactFlowNode",elements:[{name:"signature",type:"object",raw:"{}",signature:{properties:[]}},{name:"union",raw:"'table' | 'collection'",elements:[{name:"literal",value:"'table'"},{name:"literal",value:"'collection'"}]}],raw:"ReactFlowNode<{}, NodeType>"},{name:"union",raw:`| 'id'
| 'type'
| 'position'
| 'hidden'
| 'draggable'
| 'connectable'
| 'selected'
| 'selectable'
| 'style'
| 'className'
| 'measured'`,elements:[{name:"literal",value:"'id'"},{name:"literal",value:"'type'"},{name:"literal",value:"'position'"},{name:"literal",value:"'hidden'"},{name:"literal",value:"'draggable'"},{name:"literal",value:"'connectable'"},{name:"literal",value:"'selected'"},{name:"literal",value:"'selectable'"},{name:"literal",value:"'style'"},{name:"literal",value:"'className'"},{name:"literal",value:"'measured'"}]}],raw:`Pick<
  ReactFlowNode<{}, NodeType>,
  | 'id'
  | 'type'
  | 'position'
  | 'hidden'
  | 'draggable'
  | 'connectable'
  | 'selected'
  | 'selectable'
  | 'style'
  | 'className'
  | 'measured'
>`},{name:"signature",type:"object",raw:`{
  title: string;
  disabled?: boolean;
  fields: Array<NodeField>;
  borderVariant?: NodeBorderVariant;
}`,signature:{properties:[{key:"title",value:{name:"string",required:!0}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"fields",value:{name:"Array",elements:[{name:"NodeField"}],raw:"Array<NodeField>",required:!0}},{key:"borderVariant",value:{name:"union",raw:"'subtle' | 'preview' | 'selected' | 'none'",elements:[{name:"literal",value:"'subtle'"},{name:"literal",value:"'preview'"},{name:"literal",value:"'selected'"},{name:"literal",value:"'none'"}],required:!1}}]}}]}],raw:"Array<NodeProps>"},description:""},edges:{required:!0,tsType:{name:"Array",elements:[{name:"EdgeProps"}],raw:"Array<EdgeProps>"},description:""}},composes:["BaseProps"]};const fe={id:"orders",type:"table",position:{x:100,y:100},measured:{width:q,height:B*2},title:"orders",fields:[{name:"ORDER_ID",type:"varchar",glyphs:["key"]},{name:"SUPPLIER_ID",type:"varchar",glyphs:["link"]}]},_e={id:"employees",type:"collection",position:{x:300,y:300},measured:{width:q,height:B*4},title:"employees",fields:[{name:"employeeId",type:"objectId",glyphs:["key"]},{name:"employeeDetail",type:"{}"},{name:"firstName",type:"string",depth:1},{name:"lastName",type:"string",depth:1}]},et={id:"employee_territories",type:"table",position:{x:400,y:100},measured:{width:q,height:B*4},title:"employee_territories",fields:[{name:"employeeId",type:"string",glyphs:["key"]},{name:"employeeTerritory",type:"string",glyphs:["key"]}]},A={id:"employees-to-orders",source:"employees",target:"orders",markerEnd:"one",markerStart:"many"},tt={id:"employees-to-employees",source:"employees",target:"employees",markerEnd:"one",markerStart:"many"},ut={title:"Diagram",component:ye,args:{title:"MongoDB Diagram",isDarkMode:!0,edges:[A,tt],nodes:[fe,_e,et]}},L={},S={decorators:[(t,e)=>{const[n,o]=g.useState(e.args.edges),s=a=>{o([...n.filter(l=>l.source===a.source&&l.source===a.target),{...A,source:a.source,target:a.target,animated:!0,selected:!0}])},r=()=>{o(n.filter(a=>a.id!==A.id))};return t({...e,args:{...e.args,edges:n,onPaneClick:r,onConnect:s}})}],args:{title:"MongoDB Diagram",isDarkMode:!0,edges:[],nodes:[{...fe,connectable:!0},{..._e,connectable:!0}]}};var Q,J,ee;L.parameters={...L.parameters,docs:{...(Q=L.parameters)==null?void 0:Q.docs,source:{originalSource:"{}",...(ee=(J=L.parameters)==null?void 0:J.docs)==null?void 0:ee.source}}};var te,ne,oe;S.parameters={...S.parameters,docs:{...(te=S.parameters)==null?void 0:te.docs,source:{originalSource:`{
  decorators: [(Story, context) => {
    const [edges, setEdges] = useState<EdgeProps[]>(context.args.edges);
    const onConnect = (connection: Connection) => {
      setEdges([...edges.filter(edge => edge.source === connection.source && edge.source === connection.target), {
        ...ORDERS_TO_EMPLOYEES_EDGE,
        source: connection.source,
        target: connection.target,
        animated: true,
        selected: true
      }]);
    };
    const onPaneClick = () => {
      setEdges(edges.filter(edge => edge.id !== ORDERS_TO_EMPLOYEES_EDGE.id));
    };
    return Story({
      ...context,
      args: {
        ...context.args,
        edges,
        onPaneClick,
        onConnect
      }
    });
  }],
  args: {
    title: 'MongoDB Diagram',
    isDarkMode: true,
    edges: [],
    nodes: [{
      ...ORDERS_NODE,
      connectable: true
    }, {
      ...EMPLOYEES_NODE,
      connectable: true
    }]
  }
}`,...(oe=(ne=S.parameters)==null?void 0:ne.docs)==null?void 0:oe.source}}};const pt=["BasicDiagram","DiagramWithConnectableNodes"];export{L as BasicDiagram,S as DiagramWithConnectableNodes,pt as __namedExportsOrder,ut as default};
