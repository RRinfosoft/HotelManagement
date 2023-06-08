import Table from 'react-bootstrap/Table';
import Modal from '../../Modal/OrderModal'


export const  OrderObj = [
  {
    id: "1",
    img: "./img/pic.jpg",
    productName: "Product",
    productBrand: "Brand",
    Price: "15778",
    date: "26/June/2023"
  },
  {
    id: "2",
    img: "./img/pic.jpg",
    productName: "Product",
    productBrand: "Brand",
    Price: "15778",
    date: "26/June/2023"
  },
  {
    id: "3",
    img: "./img/pic.jpg",
    productName: "Product",
    productBrand: "Brand",
    Price: "15778",
    date: "26/June/2023"
  },
  {
    id: "4",
    img: "./img/pic.jpg",
    productName: "Product",
    productBrand: "Brand",
    Price: "15778",
    date: "26/June/2023"
  },
  {
    id: "5",
    img: "./img/pic.jpg",
    productName: "Product",
    productBrand: "Brand",
    Price: "15778",
    date: "26/June/2023"
  },
  {
    id: "6",
    img: "./img/pic.jpg",
    productName: "Product",
    productBrand: "Brand",
    Price: "15778",
    date: "26/June/2023"
  },
  {
    id: "7",
    img: "./img/pic.jpg",
    productName: "Product",
    productBrand: "Brand",
    Price: "15778",
    date: "26/June/2023"
  },
  {
    id: "8",
    img: "./img/pic.jpg",
    productName: "Product",
    productBrand: "Brand",
    Price: "15778",
    date: "26/June/2023"
  },
  {
    id: "9",
    img: "./img/pic.jpg",
    productName: "Product",
    productBrand: "Brand",
    Price: "15778",
    date: "26/June/2023"
  },
  {
    id: "10",
    img: "./img/pic.jpg",
    productName: "Product",
    productBrand: "Brand",
    Price: "15778",
    date: "26/June/2023"
  },
  {
    id: "11",
    img: "./img/pic.jpg",
    productName: "Product",
    productBrand: "Brand",
    Price: "15778",
    date: "26/June/2023"
  },
  {
    id: "12",
    img: "./img/pic.jpg",
    productName: "Product",
    productBrand: "Brand",
    Price: "15778",
    date: "26/June/2023"
  },
]


function OrderManagement() {

  return (
    <>
      <Table responsive="sm" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Date</th>
            <th>Action</th>
          </tr><br/>
        </thead>
        {
          OrderObj.map((item) => {
            return (
              <>
                <tbody>
                  <tr>
                    <td>{item.id}</td>
                    <td><img style={{width:"70px", height:"70px", borderRadius:"50%"}} src={item.img}/></td>
                    <td>{item.productName}</td>
                    <td>{item.Price}</td>
                    <td>{item.date}</td>
                    <td><Modal/></td>
                  </tr><br/>
                </tbody>
              </>
            )
          })
        }
      </Table>
    </>
  );
}

export default OrderManagement ;
