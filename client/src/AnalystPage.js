import React from 'react'
import './analyst.css'
import { Link } from 'react-router-dom'

function AnalystPage() {

  // const [query, setQuery] = useState('')

  const handleButtonClick = (event) => {
    // const queryNumber = event.target.textContent.slice(-1)
    // setQuery(`q${queryNumber}`)
  }

  return (
    <>
    <div>
      <h1>You can access all the analysis reports from below buttons</h1>
    </div>
    <div className="button-container">
      <div className="row">
        <button className="chocolate-button" onClick={handleButtonClick}><Link to="/q1">Find all different mobile phones and TVs available for sale and their sum</Link></button>
        <button className="chocolate-button"><Link to="/q2">Find all different mobile phones and TVs available for sale and their sum</Link></button>
        <button className="chocolate-button"><Link to="/q3">Show all customers whose total cost of the shopping cart is more than or equal to 3000, in increasing order of their total costs</Link></button>
      </div>
      <div className="row">
        <button className="chocolate-button"><Link to="/q4">Find the total revenue generated by each payment method</Link></button>
        <button className="chocolate-button"><Link to="/q5">Find the average quantity sold for different products</Link></button>
        <button className="chocolate-button"><Link to="/q6">Find the top 10 most expensive as well as the top 10 cheapest products</Link></button>
      </div>
    </div>

    <hr></hr>

    <div >
        <h2 className='user-manual1'>Please use the following guide to access what each query button do, Hope our Data helps your Analysis!</h2>

        <div className='user-manual'>
        <b>Query 1 : </b><p>Find all different mobile phones and TVs available for sale and their sum</p>
        </div>

        <div className='user-manual'>
        <b>Query 2 : </b><p> Show all customers whose total cost of the shopping cart is more than or equal to 3000, in increasing order of their total costs</p>
        </div>

        <div className='user-manual'>
        <b>Query 3 : </b><p> Find all customers who have made a purchase in the last 3 months</p>
        </div>

        <div className='user-manual'>
        <b>Query 4 : </b><p>Find the total revenue generated by each payment method:</p>
        </div>

        <div className='user-manual'>
        <b>Query 5 : </b><p> Find the average quantity sold for different products</p>
        </div>

        <div className='user-manual'>
        <b>Query 6 : </b><p>Find the top 10 most expensive as well as the top 10 cheapest products</p>
        </div>



    </div>

  </>
  )
}

export default AnalystPage


// query1:-- Find all different mobile phones and TVs available for sale and their total sum

/* Display all the products along with the location they are stored in the ranking of their prices. 
   Also provide a more continuous ranking as well as fraction of products which are cheaper than this particular product:
   (uses RANK, DENSE_RANK, PERCENT_RANK)*/

  //  SELECT p.Name, p.Product_id, p.Price, s.Location,  RANK() OVER (ORDER BY Price ASC) as PRICE_RANK, DENSE_RANK() OVER (ORDER BY Price ASC) as PRICE_DENSE_RANK,
  //  PERCENT_RANK() OVER (ORDER BY Price ASC) as PRICE_PERCENT_RANK
  //  from product p, storage s
  //  WHERE p.Product_id = s.Product_id
  //  ORDER BY PRICE_RANK;



//   -- Find the average price of a particular product which may be manufactured by different companies: 
// use martify;
// SELECT Name, Product_id, 
// avg(Price) OVER 
//           (PARTITION BY Name ORDER BY Product_id ROWS
// 		   BETWEEN 10 PRECEDING AND 10 FOLLOWING) 
// AS AVG_PRICE FROM product p
// ORDER BY Product_id;



// -- Find the quantity in storage of each individual product, as well as the total quantity of each type of product: 
