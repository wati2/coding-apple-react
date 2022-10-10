import { useParams } from 'react-router-dom';

// 전달할 수 있는 데이터는 props에서 전달 상위에서 한번에 관리하기 좋음
function DetailPage(props) {

    const { id } = useParams();

    const found = props.shoes.find(item => item.id == id);


    return (
        <div className="container">
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