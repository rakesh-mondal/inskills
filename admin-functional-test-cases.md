# Admin Role Functional Test Cases

## 1. Program Configuration

### 1.1 Semester Setup
**TC-ADM-001: Create New Semester**
```
Test Case ID: TC-ADM-001
Title: Create New Semester Configuration
Module: Program Management
Requirement ID: REQ-001
Severity: High
Priority: P0
```

Preconditions:
1. User is logged in as admin
2. Program configuration page is accessible
3. No active semester exists with same name

Test Steps:
| Step # | Action | Test Data | Expected Result | Actual Result | Status | Notes |
|--------|---------|------------|-----------------|----------------|---------|--------|
| 1 | Navigate to Program Config | - | Program configuration page loads | | | |
| 2 | Click "Add Semester" | - | New semester form opens | | | |
| 3 | Enter semester details | Name: "Semester 1"<br>Start Date: Current date<br>End Date: 6 months later<br>Max Students: 100 | Fields accept input | | | |
| 4 | Click Save | - | Success message appears<br>Semester appears in list | | | |
| 5 | Verify semester details | - | All entered details are displayed correctly | | | |

Edge Cases:
- TC-ADM-001-1: Duplicate semester name
- TC-ADM-001-2: Invalid date range
- TC-ADM-001-3: Maximum students limit exceeded

### 1.2 Module Configuration
**TC-ADM-002: Create New Module**
```
Test Case ID: TC-ADM-002
Title: Create New Module with Parameters
Module: Program Management
Requirement ID: REQ-002
Severity: High
Priority: P0
```

Preconditions:
1. User is logged in as admin
2. Program configuration page is accessible
3. At least one semester exists

Test Steps:
| Step # | Action | Test Data | Expected Result | Actual Result | Status | Notes |
|--------|---------|------------|-----------------|----------------|---------|--------|
| 1 | Navigate to Module Config | - | Module configuration page loads | | | |
| 2 | Click "Add Module" | - | New module form opens | | | |
| 3 | Enter module details | Name: "Communication Skills"<br>Description: "Public speaking and presentation"<br>Duration: 12 weeks<br>Max Score: 100 | Fields accept input | | | |
| 4 | Configure parameters | Participation: 30%<br>Communication: 25%<br>Teamwork: 20%<br>Leadership: 15%<br>Technical: 10% | Parameters sum to 100% | | | |
| 5 | Click Save | - | Success message appears<br>Module appears in list | | | |

Edge Cases:
- TC-ADM-002-1: Parameter sum not 100%
- TC-ADM-002-2: Duplicate module name
- TC-ADM-002-3: Invalid duration

## 2. Batch Management

### 2.1 Batch Creation
**TC-ADM-003: Create New Batch**
```
Test Case ID: TC-ADM-003
Title: Create New Batch with Student Import
Module: Batch Management
Requirement ID: REQ-003
Severity: High
Priority: P0
```

Preconditions:
1. User is logged in as admin
2. Batch management page is accessible
3. Valid student data file available

Test Steps:
| Step # | Action | Test Data | Expected Result | Actual Result | Status | Notes |
|--------|---------|------------|-----------------|----------------|---------|--------|
| 1 | Navigate to Batch Management | - | Batch management page loads | | | |
| 2 | Click "Create Batch" | - | New batch form opens | | | |
| 3 | Enter batch details | Name: "CS2023A"<br>Department: "Computer Science"<br>Start Date: Current date<br>End Date: 6 months later | Fields accept input | | | |
| 4 | Upload student data | File: students.csv | File uploads successfully | | | |
| 5 | Verify student import | - | All students appear in list | | | |
| 6 | Click Save | - | Success message appears<br>Batch appears in list | | | |

Edge Cases:
- TC-ADM-003-1: Invalid file format
- TC-ADM-003-2: Duplicate student entries
- TC-ADM-003-3: Maximum students limit exceeded

### 2.2 Instructor Assignment
**TC-ADM-004: Assign Instructor to Batch**
```
Test Case ID: TC-ADM-004
Title: Assign Instructor to Batch
Module: Batch Management
Requirement ID: REQ-004
Severity: High
Priority: P0
```

Preconditions:
1. User is logged in as admin
2. Batch exists with students
3. Instructor exists in system

Test Steps:
| Step # | Action | Test Data | Expected Result | Actual Result | Status | Notes |
|--------|---------|------------|-----------------|----------------|---------|--------|
| 1 | Navigate to batch details | - | Batch details page loads | | | |
| 2 | Click "Assign Instructor" | - | Instructor selection dialog opens | | | |
| 3 | Select instructor | Name: "John Doe" | Instructor selected | | | |
| 4 | Set schedule | Days: Mon, Wed<br>Time: 10:00-11:30 | Schedule saved | | | |
| 5 | Click Save | - | Success message appears<br>Instructor assigned | | | |

Edge Cases:
- TC-ADM-004-1: Instructor already assigned to another batch
- TC-ADM-004-2: Schedule conflict
- TC-ADM-004-3: Invalid time slot

## 3. Session Planning

### 3.1 Session Creation
**TC-ADM-005: Create New Session**
```
Test Case ID: TC-ADM-005
Title: Create New Session with Role Assignment
Module: Session Planning
Requirement ID: REQ-005
Severity: High
Priority: P0
```

Preconditions:
1. User is logged in as admin
2. Batch exists with students
3. Module exists

Test Steps:
| Step # | Action | Test Data | Expected Result | Actual Result | Status | Notes |
|--------|---------|------------|-----------------|----------------|---------|--------|
| 1 | Navigate to Session Planning | - | Session planning page loads | | | |
| 2 | Click "Create Session" | - | New session form opens | | | |
| 3 | Enter session details | Title: "Public Speaking"<br>Date: Tomorrow<br>Time: 10:00-11:30<br>Room: "101" | Fields accept input | | | |
| 4 | Assign roles | SL: "Student A"<br>SR: "Student B"<br>TL1: "Student C" | Roles assigned | | | |
| 5 | Click Save | - | Success message appears<br>Session appears in calendar | | | |

Edge Cases:
- TC-ADM-005-1: Room already booked
- TC-ADM-005-2: Student assigned multiple roles
- TC-ADM-005-3: Invalid time slot

### 3.2 Schedule Management
**TC-ADM-006: Manage Session Schedule**
```
Test Case ID: TC-ADM-006
Title: Manage Multiple Session Schedules
Module: Session Planning
Requirement ID: REQ-006
Severity: High
Priority: P1
```

Preconditions:
1. User is logged in as admin
2. Multiple sessions exist
3. Calendar view is accessible

Test Steps:
| Step # | Action | Test Data | Expected Result | Actual Result | Status | Notes |
|--------|---------|------------|-----------------|----------------|---------|--------|
| 1 | Navigate to calendar view | - | Calendar loads with all sessions | | | |
| 2 | Drag session to new time | Session A to 2:00 PM | Session updates with new time | | | |
| 3 | Resize session duration | Session B to 90 minutes | Duration updates | | | |
| 4 | Change room | Session C to Room 102 | Room updates | | | |
| 5 | Save changes | - | All changes persist | | | |

Edge Cases:
- TC-ADM-006-1: Overlapping sessions
- TC-ADM-006-2: Room capacity exceeded
- TC-ADM-006-3: Invalid time range

## 4. Analytics and Reporting

### 4.1 Report Generation
**TC-ADM-007: Generate Performance Report**
```
Test Case ID: TC-ADM-007
Title: Generate Batch Performance Report
Module: Analytics
Requirement ID: REQ-007
Severity: High
Priority: P1
```

Preconditions:
1. User is logged in as admin
2. Analytics dashboard accessible
3. Batch has completed sessions

Test Steps:
| Step # | Action | Test Data | Expected Result | Actual Result | Status | Notes |
|--------|---------|------------|-----------------|----------------|---------|--------|
| 1 | Navigate to Analytics | - | Analytics dashboard loads | | | |
| 2 | Select report type | Type: "Batch Performance" | Report options appear | | | |
| 3 | Set parameters | Batch: "CS2023A"<br>Period: "Last 3 months" | Parameters applied | | | |
| 4 | Generate report | - | Report generates with data | | | |
| 5 | Export report | Format: PDF | Report downloads | | | |

Edge Cases:
- TC-ADM-007-1: No data available
- TC-ADM-007-2: Large dataset handling
- TC-ADM-007-3: Custom date range validation

### 4.2 Analytics Dashboard
**TC-ADM-008: View Analytics Dashboard**
```
Test Case ID: TC-ADM-008
Title: View and Filter Analytics Dashboard
Module: Analytics
Requirement ID: REQ-008
Severity: High
Priority: P1
```

Preconditions:
1. User is logged in as admin
2. Analytics dashboard accessible
3. Multiple batches exist

Test Steps:
| Step # | Action | Test Data | Expected Result | Actual Result | Status | Notes |
|--------|---------|------------|-----------------|----------------|---------|--------|
| 1 | Load dashboard | - | All widgets load | | | |
| 2 | Apply filters | Department: "CS"<br>Time: "This Month" | Data updates | | | |
| 3 | Sort data | By: "Performance" | Data sorts correctly | | | |
| 4 | View details | Click on data point | Detailed view opens | | | |
| 5 | Export data | Format: CSV | Data exports | | | |

Edge Cases:
- TC-ADM-008-1: Multiple filter combinations
- TC-ADM-008-2: Real-time data updates
- TC-ADM-008-3: Data refresh handling

## 5. Data Validation Tests

### 5.1 Input Validation
**TC-ADM-009: Validate Input Fields**
```
Test Case ID: TC-ADM-009
Title: Validate All Input Fields
Module: All Modules
Requirement ID: REQ-009
Severity: High
Priority: P0
```

Preconditions:
1. User is logged in as admin
2. All forms accessible

Test Steps:
| Step # | Action | Test Data | Expected Result | Actual Result | Status | Notes |
|--------|---------|------------|-----------------|----------------|---------|--------|
| 1 | Test text fields | Empty input | Error message appears | | | |
| 2 | Test numeric fields | Invalid numbers | Error message appears | | | |
| 3 | Test date fields | Invalid dates | Error message appears | | | |
| 4 | Test required fields | Missing data | Error message appears | | | |
| 5 | Test format validation | Wrong format | Error message appears | | | |

Edge Cases:
- TC-ADM-009-1: Special characters
- TC-ADM-009-2: Maximum length
- TC-ADM-009-3: Unicode characters

### 5.2 Configuration Validation
**TC-ADM-010: Validate System Configuration**
```
Test Case ID: TC-ADM-010
Title: Validate System Configuration Settings
Module: Program Management
Requirement ID: REQ-010
Severity: High
Priority: P0
```

Preconditions:
1. User is logged in as admin
2. Configuration page accessible

Test Steps:
| Step # | Action | Test Data | Expected Result | Actual Result | Status | Notes |
|--------|---------|------------|-----------------|----------------|---------|--------|
| 1 | Test scoring rules | Invalid percentages | Error message appears | | | |
| 2 | Test scheduling rules | Invalid time slots | Error message appears | | | |
| 3 | Test capacity limits | Exceed limits | Error message appears | | | |
| 4 | Test dependencies | Invalid combinations | Error message appears | | | |
| 5 | Test system settings | Invalid values | Error message appears | | | |

Edge Cases:
- TC-ADM-010-1: Boundary values
- TC-ADM-010-2: Complex rules
- TC-ADM-010-3: System constraints 