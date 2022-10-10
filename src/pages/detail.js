import { useParams } from 'react-router-dom';
import styled from 'styled-components'

// styled-components 장점
// 스타일이 다른 js 파일로 오염되지 않음
// props로 컴포넌트 재활용 가능
// 단점 JS파일 매우 복잡해짐
// 스타일 재사용인 경우 import 할 텐데 CSS와 다를바가 없군..
// CSS 담당의 숙련도 이슈
let YellowBtn = styled.button`
    background: ${ props => props.bg };
    color: black;
    padding: 10px;
`



// 전달할 수 있는 데이터는 props에서 전달 상위에서 한번에 관리하기 좋음
function DetailPage(props) {

    const { id } = useParams();

    const found = props.shoes.find(item => item.id == id);


    return (
        <div className="container">
            <YellowBtn bg='blue'>Btn</YellowBtn>
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