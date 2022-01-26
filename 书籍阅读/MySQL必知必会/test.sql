select
  Concat(RTrim(name), ' (', RTrim(country), ')') AS vend_title
from
  vendors
ORDER BY
  name;