/* One illustrative snapshot feeds every screen, tooltip and export. */
(function(root){
  const asOf='2026-10-07';
  const supplier={name:'Atlas Cloud Services',legalName:'Atlas Cloud Services Ltd',claimed:false};
  const records=[
    {id:'cyber',name:'Cyber Essentials',issuedOn:'2026-02-01',expiresOn:'2027-01-31',issuer:'IASME',certificateId:'DEMO-CE-2026',legalEntity:supplier.legalName,scope:'Corporate IT systems used to deliver and support Atlas Cloud Services, including employee devices and managed cloud services.',summary:'Corporate IT and managed cloud services',source:{type:'Certificate register',file:'Cyber-Essentials.pdf',discoveredOn:asOf,kind:'certificate'}},
    {id:'iso27001',name:'ISO 27001:2022',issuedOn:'2025-01-18',expiresOn:'2028-01-17',issuer:'BSI',certificateId:'DEMO-IS-27001',legalEntity:supplier.legalName,scope:'The information security management system supporting cloud hosting, platform operations and customer support at Atlas Cloud Services Ltd.',summary:'Cloud hosting, operations and customer support',source:{type:'Supplier trust centre',file:'ISO-27001-2022.pdf',discoveredOn:asOf,kind:'certificate'}},
    {id:'cyberplus',name:'Cyber Essentials Plus',issuedOn:'2025-10-01',expiresOn:'2026-09-30',issuer:'IASME',certificateId:'DEMO-CEP-2025',legalEntity:supplier.legalName,scope:'Technical verification of the corporate IT environment supporting Atlas Cloud Services.',summary:'Corporate IT environment',source:{type:'Certificate register',file:'Cyber-Essentials-Plus.pdf',discoveredOn:asOf,kind:'certificate'}},
    {id:'iso22301',name:'ISO 22301:2019',issuedOn:'2024-02-19',expiresOn:'2027-02-18',issuer:'BSI',certificateId:'DEMO-BC-22301',legalEntity:supplier.legalName,scope:'Business continuity management for the delivery and recovery of cloud hosting and customer support operations.',summary:'Business continuity for hosting and support',source:{type:'Supplier trust centre',file:'ISO-22301-2019.pdf',discoveredOn:asOf,kind:'certificate'}},
    {id:'iso27701',name:'ISO 27701',issuedOn:null,expiresOn:null,issuer:null,certificateId:null,legalEntity:null,scope:null,summary:'Website claim only; certificate not found',source:{type:'Supplier website',file:null,discoveredOn:asOf,kind:'claim'}}
  ];
  const monitoring={asOf,assets:44,severity:[{label:'Critical',count:2},{label:'High',count:5},{label:'Medium',count:8},{label:'Low',count:6},{label:'Informational',count:3}]};
  function status(record,date=asOf){if(record.source.kind!=='certificate'||!record.expiresOn||!record.issuedOn)return 'Needs review';if(record.issuedOn>date)return 'Not yet valid';return record.expiresOn<date?'Expired':'Valid';}
  function formatDate(date){if(!date)return 'Not found';return new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z'));}
  function counts(list=records){return list.reduce((n,r)=>(n[status(r)]=(n[status(r)]||0)+1,n),{total:list.length,Valid:0,Expired:0,'Needs review':0,'Not yet valid':0});}
  function get(id){const r=records.find(r=>r.id===id);if(!r)throw new Error('Unknown certification');return r;}
  function summary(record){return {...record,status:status(record),expires:formatDate(record.expiresOn),issued:formatDate(record.issuedOn)};}
  const model={asOf,supplier,records,monitoring,status,formatDate,counts,get,summary};
  root.SupplierData=model;
  if(typeof module!=='undefined')module.exports=model;
})(globalThis);
