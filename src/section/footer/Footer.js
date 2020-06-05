import React from 'react';
import * as fbicon from '../../assets/images/fb.png';
import * as twittericon from '../../assets/images/twitter.jpg';
import * as wpicon from '../../assets/images/wp.png';
import RcFooter from 'rc-footer';
import {IoMdArrowRoundUp} from 'react-icons/io'
const ToTop= ()=>{
    document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
const Footer=()=>{
    const footerItems=[  {
        title: 'Social media',
        
        items:[{
          icon:(<img src={fbicon}alt='fb'/>),
          title:'Facebook',
          url:'https://www.facebook.com',
          description:'facebook link',
          openExternal:true
        },
        {
          icon:(<img src={wpicon} alt='wp'/>),
        title:'Whatsapp',
        url:'https://wa.me/917978689252',
        openExternal:true,
        description:'7978689252'
      },
      {
        icon:(<img src={twittericon} alt='t'/>),
      title:'Follow ',
      url:'https://twitter.com/ItzAdil_Hussain?ref_src=twsrc%5Etfw',
      openExternal:true,
      description:'join in twitter'
    }]  
},{
    title:'About',
    items:[{
        title:'Learn about us',
        style:{cursor: 'pointer'},
        description:'details'

    },
    {
        title:'Support us',
        style:{cursor: 'pointer'},
        description:'Become a Partner'
    },
    {
        title: 'Purchase from us',
        url: 'https://my-grocery-ap.web.app',
        openExternal:true,
        description:'Best price'
    }
    ]
    
},
{
title:'Team',
items:[
  {title: 'Adil Hussain',
  },
  {
    title:'Albatross Mullick',

  },
  {
    title:'Muhammad Kamran',
  },
{
  title:'Vivek Sahoo',
}

]
},
{
    title:'Scroll',
    items:[{
        title:(<span onClick={ToTop}>Scroll to top</span>),
        icon:(<IoMdArrowRoundUp/>),
        style:{cursor: 'pointer'}
    }
    ]
    
}
    ]
    return(

        <RcFooter
        columns={footerItems}
        bottom="Made with ❤️"
      />
)}
export default Footer;