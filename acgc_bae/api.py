import frappe

@frappe.whitelist(allow_guest=True)
def get_mpd_kpi(month=None, year=None, site=None):

    conditions = "1=1"
    values = {}

    if site:
        conditions += " AND site = %(site)s"
        values["site"] = site

    if month:
        conditions += " AND MONTH(posting_date) = %(month)s"
        values["month"] = month

    if year:
        conditions += " AND YEAR(posting_date) = %(year)s"
        values["year"] = year

    docs = frappe.db.sql(f"""
        SELECT name
        FROM `tabMonthly Progress Data`
        WHERE {conditions}
    """, values, as_dict=True)

    result = []

    for d in docs:
        doc = frappe.get_doc("Monthly Progress Data", d.name)

        for row in doc.kpi_title:
            result.append({
                "kpi_title": row.kpi_title,
                "performance_measure": row.performance_measure,
                "achieved": row.achieved
            })

    return result