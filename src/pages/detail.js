import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'


// 전달할 수 있는 데이터는 props에서 전달 상위에서 한번에 관리하기 좋음
function DetailPage(props) {

    // use어쩌고는 Hook임
    // mount, update 될 때 코드 실행해주는 useEffect
    // update 시? 재 렌더링 되는 경우에
    // useEffect 안에 있는 코드는 html 렌더링 이후에 동작합니다
    // 먼저 html을 보여줘서 빠른 페이지 로딩느낌을 줄 수 있음, 사용자에게 중요하지 않은 연산인 경우도 있으니
    // 서버에서 데이터 가져오는 작업, 타이머 장착하는 것 등
    // 왜 이름이 Effect 어쩌구? Side Effect에서 따옴: 함수의 핵심기능과 상관없는 기능, 부가기능
    let [count, setCount] = useState(0)
    let [hidden, setHidden] = useState(false)

    useEffect(()=>{
        setTimeout(()=>(setHidden(true)),2000)
        console.log('안녕')
    })
    

    const { id } = useParams();

    const found = props.shoes.find(item => item.id == id);


    return (
        <div className="container">
            {hidden? null : <div className="alert alert-warning">
                2초 이내 구매시 할인
            </div>}
            <button onClick={()=>setCount(++count)}>count:{count}</button>
            <div className="row">
                <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${1 + parseInt(id)}.jpg`} alt='ShoeImg' width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                <h4 className="pt-5">{found.title}</h4>
                <p>{found.content}</p>
                <p>{found.price}원</p>
                <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>
        </div>         
    )
}

export default DetailPage