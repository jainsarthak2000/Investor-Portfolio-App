let statusMap = {
  operating: "text-success",
  acquired: "text-warning",
  closed: "text-danger"
}

let fundingTypeMap = {
  convertible_note: "Convertible Note",
  undisclosed: "Undisclosed",
  debt_financing: "Debt Financing",
  angel: "Angel",
  post_ipo_debt: "Post IPO Debt",
  private_equity: "Private Equity",
  venture: "Venture",
  equity_crowdfunding: "Equity Crowdfunding",
  product_crowdfunding: "Product Crowdfunding",
  grant: "Grant",
  secondary_market: "Secondary Market",
  seed: "Seed",
  post_ipo_equity: "Post IPO Equity",
}

module.exports = {
  statusMap,
  fundingTypeMap,
}