exports.invoiceTemplate = function (order) {
  const today = new Date();
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
      }
  
      .invoice-container {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #ccc;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
  
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
  
      .invoice-details {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
      }
  
      .invoice-details div {
        text-align: left;
      }
  
      .item-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }
  
      .item-table th, .item-table td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: center;
      }
  
      .total {
        margin-top: 20px;
        text-align: right;
      }
    </style>
  </head>
  <body>
  
    <div class="invoice-container">
      <div class="header">
        <h1>Invoice #${order.id}</h1>
      </div>
  
      <div class="invoice-details">
        <div>
          <p><strong>From:</strong> VSHOP</p>
          <p>karnal, Haryana</p>
          <p>Email: vijayrana81203@gamil.com</p>
        </div>
        <div>
          <p><strong>To:</strong>${order.address.name}</p>
          <p>${order.address.street}, ${order.address.state}, ${order.address.PinCode}</p>
          <p>${order.address.email}, ${order.address.phone}</p>
        </div>
      </div>
  
      <table class="item-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
        ${ order?.products.map((product)=> (`<tr>
          <td>${product.product.title}</td>
          <td>${product.quantity}</td>
          <td>${ Math.round(product.product.price*(1-product.product.discountPercentage/100))}.00</td>
          <td>${Math.round(product.product.price*(1-product.product.discountPercentage/100))*product.quantity}.00</td>
        </tr>`)) }
          <!-- Add more rows for additional items -->
        </tbody>
      </table>
  
      <div class="total">
        <p><strong>Total:</strong> ${order.totalCost}.00</p>
      </div>
  
    </div>
  
  </body>
  </html>
    `;
};
