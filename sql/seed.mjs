import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log("Seeding database...");

  await sql`DELETE FROM flag_actions`;
  await sql`DELETE FROM flags`;
  await sql`DELETE FROM cases`;

  const cases = [
    "CASE-70000", "CASE-70001", "CASE-70002",
    "CASE-70003", "CASE-70004", "CASE-70007",
  ];

  for (const cn of cases) {
    await sql`INSERT INTO cases (case_number) VALUES (${cn})`;
  }

  const caseRows = await sql`SELECT id, case_number FROM cases ORDER BY case_number`;
  const caseMap = {};
  for (const row of caseRows) {
    caseMap[row.case_number] = row.id;
  }

  const flagsFor70007 = [
    {
      title: "Unearned benefit type transition may need review",
      category: "UNEARNED INCOME",
      budget_screen_info: "The budget shows an active Social Security benefit of $943/month.",
      case_file_info: "State records indicate a recent transition from SSI to SSDI that is not reflected in the current budget.",
      explanation: "The benefit type may have changed from SSI to SSDI. Verify the current benefit type and amount with the Social Security Administration.",
    },
    {
      title: "Possible missing unearned income line",
      category: "INCOME COMPLETENESS",
      budget_screen_info: "The budget does not show any unearned income benefits.",
      case_file_info: "State records indicate active benefit enrollment that is not reflected in the budget.",
      explanation: "There may be unearned income (such as SSI, TANF, or unemployment) not entered in the system. Verify with benefit verification letters.",
    },
    {
      title: "Possible missing earned line",
      category: "INCOME COMPLETENESS",
      budget_screen_info: "The budget shows no earned income for the primary applicant.",
      case_file_info: "Employment records indicate wages reported in the last quarter.",
      explanation: "Earned income may not be reflected in the current budget. Verify employment status and wages with recent pay stubs.",
    },
    {
      title: "Unearned benefit status may be active/ended mismatch",
      category: "UNEARNED INCOME",
      budget_screen_info: "The budget shows an active unearned income benefit.",
      case_file_info: "Benefit verification shows the benefit has been terminated or suspended.",
      explanation: "The unearned benefit may no longer be active. Verify current benefit status with the issuing agency.",
    },
  ];

  for (const f of flagsFor70007) {
    await sql`
      INSERT INTO flags (case_id, title, category, status, budget_screen_info, case_file_info, explanation)
      VALUES (${caseMap["CASE-70007"]}, ${f.title}, ${f.category}, 'PENDING REVIEW',
              ${f.budget_screen_info}, ${f.case_file_info}, ${f.explanation})
    `;
  }

  const flagsFor70000 = [
    {
      title: "Shelter cost exceeds standard deduction threshold",
      category: "SHELTER COSTS",
      budget_screen_info: "Monthly shelter costs entered as $1,850.",
      case_file_info: "Lease agreement on file shows rent of $1,200/month.",
      explanation: "The shelter cost in the budget exceeds the documented lease amount. Verify with current lease or mortgage statement.",
    },
    {
      title: "Medical expense documentation incomplete",
      category: "MEDICAL EXPENSES",
      budget_screen_info: "Medical deduction of $350/month is applied.",
      case_file_info: "Only $150/month in medical expenses is documented in the case file.",
      explanation: "Medical expense deduction exceeds documented amounts. Request updated medical bills or pharmacy receipts.",
    },
  ];

  for (const f of flagsFor70000) {
    await sql`
      INSERT INTO flags (case_id, title, category, status, budget_screen_info, case_file_info, explanation)
      VALUES (${caseMap["CASE-70000"]}, ${f.title}, ${f.category}, 'PENDING REVIEW',
              ${f.budget_screen_info}, ${f.case_file_info}, ${f.explanation})
    `;
  }

  const flagsFor70001 = [
    {
      title: "Household size discrepancy detected",
      category: "HOUSEHOLD COMPOSITION",
      budget_screen_info: "Budget calculated for a household of 3.",
      case_file_info: "Application and verification documents list 5 household members.",
      explanation: "The household size in the budget does not match the application. Verify current household members.",
    },
    {
      title: "Child support income not reflected",
      category: "INCOME COMPLETENESS",
      budget_screen_info: "No child support income is listed in the budget.",
      case_file_info: "Court order on file shows child support of $400/month.",
      explanation: "Court-ordered child support may need to be included as income. Verify if payments are being received.",
    },
    {
      title: "Resource limit may be exceeded",
      category: "RESOURCE VERIFICATION",
      budget_screen_info: "Countable resources listed as $1,500.",
      case_file_info: "Bank statements show combined balance of $3,200.",
      explanation: "Resources may exceed the program limit. Verify all bank accounts and countable assets.",
    },
  ];

  for (const f of flagsFor70001) {
    await sql`
      INSERT INTO flags (case_id, title, category, status, budget_screen_info, case_file_info, explanation)
      VALUES (${caseMap["CASE-70001"]}, ${f.title}, ${f.category}, 'PENDING REVIEW',
              ${f.budget_screen_info}, ${f.case_file_info}, ${f.explanation})
    `;
  }

  const flagsFor70002 = [
    {
      title: "Self-employment income calculation needs review",
      category: "INCOME COMPLETENESS",
      budget_screen_info: "Net self-employment income entered as $800/month.",
      case_file_info: "Tax return shows gross income of $2,400/month with $900 in allowable expenses.",
      explanation: "Net self-employment income may be miscalculated. Verify using tax returns and expense documentation.",
    },
  ];

  for (const f of flagsFor70002) {
    await sql`
      INSERT INTO flags (case_id, title, category, status, budget_screen_info, case_file_info, explanation)
      VALUES (${caseMap["CASE-70002"]}, ${f.title}, ${f.category}, 'PENDING REVIEW',
              ${f.budget_screen_info}, ${f.case_file_info}, ${f.explanation})
    `;
  }

  const flagsFor70003 = [
    {
      title: "Citizenship/immigration status needs verification",
      category: "ELIGIBILITY",
      budget_screen_info: "Applicant marked as eligible non-citizen.",
      case_file_info: "Immigration document on file has expired.",
      explanation: "The immigration document may need to be renewed. Verify current immigration status with USCIS.",
    },
    {
      title: "Utility allowance type may be incorrect",
      category: "SHELTER COSTS",
      budget_screen_info: "Full utility allowance of $520 applied.",
      case_file_info: "Lease indicates utilities are included in rent.",
      explanation: "If utilities are included, a lower utility allowance may apply. Verify with the landlord or lease.",
    },
  ];

  for (const f of flagsFor70003) {
    await sql`
      INSERT INTO flags (case_id, title, category, status, budget_screen_info, case_file_info, explanation)
      VALUES (${caseMap["CASE-70003"]}, ${f.title}, ${f.category}, 'PENDING REVIEW',
              ${f.budget_screen_info}, ${f.case_file_info}, ${f.explanation})
    `;
  }

  const flagsFor70004 = [
    {
      title: "Dependent care deduction documentation missing",
      category: "DEPENDENT CARE",
      budget_screen_info: "Dependent care deduction of $600/month applied.",
      case_file_info: "No childcare provider verification on file.",
      explanation: "The dependent care deduction requires provider verification. Request childcare provider statement.",
    },
    {
      title: "Duplicate SSN detected in another case",
      category: "DATA INTEGRITY",
      budget_screen_info: "SSN ending in 4532 is listed for household member.",
      case_file_info: "Same SSN appears as primary applicant in CASE-70009.",
      explanation: "A household member's SSN is associated with another case. Investigate for potential duplicate enrollment.",
    },
    {
      title: "Recertification date overdue",
      category: "TIMELINESS",
      budget_screen_info: "Certification period ended 2025-12-31.",
      case_file_info: "No recertification application received.",
      explanation: "The case certification has expired. Contact the household to initiate recertification.",
    },
  ];

  for (const f of flagsFor70004) {
    await sql`
      INSERT INTO flags (case_id, title, category, status, budget_screen_info, case_file_info, explanation)
      VALUES (${caseMap["CASE-70004"]}, ${f.title}, ${f.category}, 'PENDING REVIEW',
              ${f.budget_screen_info}, ${f.case_file_info}, ${f.explanation})
    `;
  }

  console.log("Done! Seeded 6 cases with flags.");
}

seed().catch(console.error);
