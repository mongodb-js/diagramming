import{j as r}from"./iframe-C300407d.js";import{N as C,R as D,E as R}from"./node-BpcRGtQt.js";import"./index-k6QiPQ3a.js";import"./index-UBVyW2DE.js";const L=[{name:"customerId",type:"string",hasChildren:!1,isVisible:!0},{name:"companyName",type:"string",hasChildren:!1,isVisible:!0},{name:"phoneNumber",type:"number",hasChildren:!1,isVisible:!0}],s={id:"orders",type:"collection",position:{x:100,y:100},data:{title:"orders",fields:L.map(e=>({...e,hasChildren:!1,isVisible:!0}))}},X={title:"Node",component:C,decorators:[e=>r.jsx(D,{children:r.jsx(R,{children:r.jsx("div",{style:{padding:"100px"},children:r.jsx(e,{})})})})]},a={args:s},t={args:{...s,type:"table"}},n={args:{...s,type:"connectable"}},S=[{name:"customerId",type:"string",glyphs:["key"]},{name:"companyName",type:"string",glyphs:["link"]}],i={args:{...s,data:{title:"orders",fields:S.map(e=>({...e,hasChildren:!1,isVisible:!0}))}}},F=[{name:"customerId",type:"string",glyphs:["key","link"]},{name:"companyName",type:"string",glyphs:["key","link"]},{name:"addressId",type:"string"}],d={args:{...s,data:{title:"orders",fields:F.map(e=>({...e,hasChildren:!1,isVisible:!0}))}}},O=[{name:"customerId",glyphs:["key","link","link"],type:"someReallyLongStringRepresentation"},{name:"oneReallyReallyReally",type:"string"},{name:"anotherReallyLongName",type:"someReallyLongStringRepresentation"}],l={args:{...s,data:{title:"enterprise_tenant_finance_department_legacy_system_us_east_1_schema_2025_v15_monthly_billing_transactions_20250702145533",fields:O.map(e=>({...e,hasChildren:!1,isVisible:!0}))}}},k=[{name:"customerId",type:"string"},{name:"detail",type:"{}",expanded:!0},{name:"companyName",type:"{}",depth:1,expanded:!1},{name:"acronym",type:"string",depth:2},{name:"fullName",type:"string",depth:2},{name:"phoneNumber",type:"number",depth:1}],o={args:{...s,data:{title:"orders",fields:k.map(e=>({...e,hasChildren:"expanded"in e,isVisible:!0}))}}},p={args:{...s,data:{title:"orders",fields:[{name:"customerId",type:"string",variant:"default",glyphs:["key"],hasChildren:!1,isVisible:!0}]}}},m={args:{...s,data:{disabled:!0,title:"orders",fields:[{name:"customerId",type:"string",glyphs:["key"],hasChildren:!1,isVisible:!0}]}}},c={args:{...s,data:{title:"orders",fields:[{name:"customerId",type:"string",variant:"disabled",glyphs:["key"],hasChildren:!1,isVisible:!0}]}}},h={args:{...s,data:{title:"orders",fields:[{name:"customerId",type:"string",variant:"disabled",hoverVariant:"default",glyphs:["key"],hasChildren:!1,isVisible:!0}]}}},A=[{name:"customerId",type:["string","number"],variant:"default",glyphs:["key"]},{name:"customerId",type:["string","number","objectId","array","date","boolean","null","decimal","object","regex"]}],y={args:{...s,data:{title:"orders",fields:A.map(e=>({...e,hasChildren:!1,isVisible:!0}))}}},g={args:{...s,data:{title:"orders",fields:[{name:"customerId",type:"string",variant:"primary",glyphs:["key","link"],hasChildren:!1,isVisible:!0}]}}},P=[{name:"customerId",type:"string"},{name:"companyName",type:"string",variant:"preview"},{name:"phoneNumber",type:"number",variant:"preview"},{name:"address",type:"string",variant:"preview"}],u={args:{...s,data:{title:"orders",fields:P.map(e=>({...e,hasChildren:!1,isVisible:!0}))}}},x=[{name:"_id",type:"string",variant:"preview",glyphs:["key"]},{name:"customerId",type:"string",variant:"preview",glyphs:["key","link"]},{name:"companyName",type:"string",variant:"preview"}],f={args:{...s,data:{title:"orders",fields:x.map(e=>({...e,hasChildren:!1,isVisible:!0}))}}},G=[{name:"customerId",type:"string",glyphs:["key","link"]},{name:"companyName",type:"string",variant:"preview"},{name:"address",type:"string",variant:"preview"},{name:"fullName",type:"string",variant:"preview"}],N={args:{...s,data:{title:"orders",fields:G.map(e=>({...e,hasChildren:!1,isVisible:!0}))}}},j=[{name:"orderId",type:"string",glyphs:["key"]},{name:"customer",type:"{}",variant:"preview"},{name:"customerId",type:"string",depth:1,variant:"preview"},{name:"addresses",type:"[]",depth:1,variant:"preview"},{name:"addresses",type:"string",depth:2,variant:"preview"},{name:"streetName",type:"string",depth:2,variant:"preview"}],v={args:{...s,data:{title:"orders",fields:j.map(e=>({...e,hasChildren:!1,isVisible:!0}))}}},M=[{name:"orderId",type:"string",glyphs:["key"]},{name:"customer",type:"{}"},{name:"customerId",type:"string",depth:1},{name:"addresses",type:"[]",depth:1,variant:"preview"},{name:"streetName",type:"string",depth:2,variant:"preview"},{name:"postcode",type:"number",depth:2,variant:"preview"},{name:"country",type:"string",depth:2,variant:"preview"}],b={args:{...s,data:{title:"orders",fields:M.map(e=>({...e,hasChildren:!1,isVisible:!0}))}}},B=[{name:"orderId",type:"string",glyphs:["key"],variant:"preview"},{name:"customer",type:"{}"},{name:"customerId",type:"string",depth:1},{name:"addresses",type:"[]",depth:1},{name:"streetName",type:"string",depth:2,variant:"preview"}],_={args:{...s,data:{title:"orders",fields:B.map(e=>({...e,hasChildren:!1,isVisible:!0}))}}},H=[{name:"_id",type:"objectid",glyphs:["key"]},{name:"customer",type:"{}",selected:!0},{name:"customerId",type:"string",depth:1},{name:"addresses",type:"[]",depth:1},{name:"streetName",type:"string",depth:2},{name:"source",type:"string"},{name:"orderedAt",type:"date",selected:!0}],w={args:{...s,data:{title:"orders",fields:H.map(e=>({...e,hasChildren:!1,isVisible:!0}))}}},q=[{name:"_id",type:"objectid",glyphs:["key"]},{name:"customer",type:"{}"}],E={args:{...s,data:{title:"orders",variant:{type:"warn",warnMessage:"This is a warning message for the Orders node."},fields:q.map(e=>({...e,hasChildren:!1,isVisible:!0}))}}},z=[{name:"_id",type:"objectid",glyphs:["key"]},{name:"customer",type:"{}"}],I={args:{...s,data:{title:"orders_with_a_very_long_title_exceeding_normal_length_limits",variant:{type:"warn",warnMessage:"This is a warning message for the Orders node."},fields:z.map(e=>({...e,hasChildren:!1,isVisible:!0}))}}},W={args:{...s,data:{...s.data,borderVariant:"selected"}}},V={args:{...s,data:{...s.data,borderVariant:"preview"}}},T={args:{...s,data:{...s.data,borderVariant:"subtle"}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: INTERNAL_NODE
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    type: 'table'
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    type: 'connectable'
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: fieldsWithGlyph.map(field => ({
        ...field,
        hasChildren: false,
        isVisible: true
      }))
    }
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: fieldsWithMultipleGlyphs.map(field => ({
        ...field,
        hasChildren: false,
        isVisible: true
      }))
    }
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'enterprise_tenant_finance_department_legacy_system_us_east_1_schema_2025_v15_monthly_billing_transactions_20250702145533',
      fields: fieldsWithLongValues.map(field => ({
        ...field,
        hasChildren: false,
        isVisible: true
      }))
    }
  }
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: nestedFields.map(field => ({
        ...field,
        hasChildren: 'expanded' in field,
        isVisible: true
      }))
    }
  }
}`,...o.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: [{
        name: 'customerId',
        type: 'string',
        variant: 'default',
        glyphs: ['key'],
        hasChildren: false,
        isVisible: true
      }]
    }
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      disabled: true,
      title: 'orders',
      fields: [{
        name: 'customerId',
        type: 'string',
        glyphs: ['key'],
        hasChildren: false,
        isVisible: true
      }]
    }
  }
}`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: [{
        name: 'customerId',
        type: 'string',
        variant: 'disabled',
        glyphs: ['key'],
        hasChildren: false,
        isVisible: true
      }]
    }
  }
}`,...c.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: [{
        name: 'customerId',
        type: 'string',
        variant: 'disabled',
        hoverVariant: 'default',
        glyphs: ['key'],
        hasChildren: false,
        isVisible: true
      }]
    }
  }
}`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: multipleTypesField.map(field => ({
        ...field,
        hasChildren: false,
        isVisible: true
      }))
    }
  }
}`,...y.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: [{
        name: 'customerId',
        type: 'string',
        variant: 'primary',
        glyphs: ['key', 'link'],
        hasChildren: false,
        isVisible: true
      }]
    }
  }
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: fieldsWithPreview.map(field => ({
        ...field,
        hasChildren: false,
        isVisible: true
      }))
    }
  }
}`,...u.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: fieldsWithPreviewGlyphs.map(field => ({
        ...field,
        hasChildren: false,
        isVisible: true
      }))
    }
  }
}`,...f.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: fieldsWithSomePreviewGlyphs.map(field => ({
        ...field,
        hasChildren: false,
        isVisible: true
      }))
    }
  }
}`,...N.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: fieldsWithNestedPreview.map(field => ({
        ...field,
        hasChildren: false,
        isVisible: true
      }))
    }
  }
}`,...v.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: deeplyNestedPreviewFields.map(field => ({
        ...field,
        hasChildren: false,
        isVisible: true
      }))
    }
  }
}`,...b.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: fieldsWithDeeplyNestedPreviewEverywhere.map(field => ({
        ...field,
        hasChildren: false,
        isVisible: true
      }))
    }
  }
}`,..._.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: fieldsWithSelected.map(field => ({
        ...field,
        hasChildren: false,
        isVisible: true
      }))
    }
  }
}`,...w.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      variant: {
        type: 'warn',
        warnMessage: 'This is a warning message for the Orders node.'
      },
      fields: fieldsWithWarning.map(field => ({
        ...field,
        hasChildren: false,
        isVisible: true
      }))
    }
  }
}`,...E.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders_with_a_very_long_title_exceeding_normal_length_limits',
      variant: {
        type: 'warn',
        warnMessage: 'This is a warning message for the Orders node.'
      },
      fields: fieldsForLongTitleWarning.map(field => ({
        ...field,
        hasChildren: false,
        isVisible: true
      }))
    }
  }
}`,...I.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      ...INTERNAL_NODE.data,
      borderVariant: 'selected'
    }
  }
}`,...W.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      ...INTERNAL_NODE.data,
      borderVariant: 'preview'
    }
  }
}`,...V.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    ...INTERNAL_NODE,
    data: {
      ...INTERNAL_NODE.data,
      borderVariant: 'subtle'
    }
  }
}`,...T.parameters?.docs?.source}}};const Y=["CollectionType","RelationalType","ConnectableType","FieldsWithGlyph","FieldsWithGlyphs","FieldsWithLongValues","NestedFields","NodeWithDefaultField","DisabledNode","DisabledField","DisabledWithHoverVariant","NodeWithMultipleTypesField","NodeWithPrimaryField","NodeWithPreviewFields","NodeWithPreviewGlyphs","NodeWithSomePreviewGlyphs","NodeWithNestedPreviewFields","NodeWithDeeplyNestedPreviewFields","NodeWithDeeplyNestedPreviewFieldsEverywhere","NodeWithSelectedFields","NodeWithWarningIcon","NodeWithLongTitleAndWarningIcon","SelectedBorder","PreviewBorder","SubtleBorder"];export{a as CollectionType,n as ConnectableType,c as DisabledField,m as DisabledNode,h as DisabledWithHoverVariant,i as FieldsWithGlyph,d as FieldsWithGlyphs,l as FieldsWithLongValues,o as NestedFields,b as NodeWithDeeplyNestedPreviewFields,_ as NodeWithDeeplyNestedPreviewFieldsEverywhere,p as NodeWithDefaultField,I as NodeWithLongTitleAndWarningIcon,y as NodeWithMultipleTypesField,v as NodeWithNestedPreviewFields,u as NodeWithPreviewFields,f as NodeWithPreviewGlyphs,g as NodeWithPrimaryField,w as NodeWithSelectedFields,N as NodeWithSomePreviewGlyphs,E as NodeWithWarningIcon,V as PreviewBorder,t as RelationalType,W as SelectedBorder,T as SubtleBorder,Y as __namedExportsOrder,X as default};
