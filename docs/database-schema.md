# 🗄️ Database Schema — Complete & Corrected

> Fixes all missing models from `req.md`, adds indexes, corrects money types, adds soft-delete.

## Issues Fixed

1. ✅ Defined 7 missing models: `BookingService`, `BookingPhoto`, `StaffSchedule`, `SubscriptionPlan`, `Addon`, `Notification`, `Address`
2. ✅ `Float` → `Decimal` for all money fields
3. ✅ Composite + single-column indexes on hot query paths
4. ✅ `deletedAt` for soft-delete on `User`, `Car`, `Booking`
5. ✅ Back-relation `User` → `Staff`
6. ✅ Added `EN_ROUTE`, `REFUNDED` booking statuses
7. ✅ Added `PhotoType`, `NotificationType`, `BillingCycle` enums

## Key Design Decisions

| Decision | Rationale |
|---|---|
| `Decimal(10,2)` for money | Float causes rounding errors ($29.99 → $29.990000000000002) |
| `BookingService` join table | Supports multiple services + addons per booking with price snapshots |
| `ServicePricing` unique on `[serviceId, carSize]` | Enforces one price per service-size combo |
| Soft-delete over hard-delete | Preserves booking/loyalty history when customer deactivates |
| `StaffSchedule` unique on `[staffId, dayOfWeek]` | One schedule entry per technician per day |
| `Notification.data` as `Json` | Flexible payload (links, booking IDs, actions) without schema bloat |

## Index Strategy

| Index | Query Pattern |
|---|---|
| `Booking(userId, status)` | "Show my pending bookings" |
| `Booking(status, scheduledAt)` | "Today's confirmed bookings" (admin) |
| `Booking(technicianId)` | "This technician's schedule" |
| `Notification(userId, isRead)` | "Unread notifications badge count" |
| `LoyaltyEvent(userId, createdAt)` | "Points history timeline" |
| `ServicePricing(serviceId, carSize)` | "Price for this service + car size" |

> See the full Prisma schema in [architecture-analysis.md](./architecture-analysis.md) section 1.3 for the complete model definitions. The schema should be created in `prisma/schema.prisma` during Phase 1 implementation.
