// import { useState } from "react";

function watchedItems({shoes}) {

  let watchedItems = JSON.parse(localStorage.getItem('watched'))

  return( 
    <div>
      <h4>최근본 상품</h4>
      {watchedItems.map((x,idx)=>{

        let found = shoes.find(item=>item.id==x)

        return (<div key={idx}>
            <strong>
              {`${found.title}    ${found.price}원`}
            </strong>
          </div>)
        }
      )}
    </div>
  )
}

export default watchedItems