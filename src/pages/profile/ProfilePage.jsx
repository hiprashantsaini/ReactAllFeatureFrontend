import { ArrowUpRight, BadgeCheck, CalendarDays, CreditCard, LogOut, UserRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";

import { features } from "../../components/home/FeaturesShowcase";
import { clearUserData } from "../../redux/userSlice";

const formatDate = (value, fallback = "Not available") => {
  if (!value) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Not available"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
};

const PlanCard = ({ subscription, singlePlanFeatures }) => {
  const metadata = Object.entries(subscription.metadata ?? {}).filter(
    ([, value]) => value !== null && ["string", "number", "boolean"].includes(typeof value)
  );

  return (
    <article className="rounded-lg border border-(--primary-border) bg-(--secondary-bg) p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-(--secondary-text)">
            {subscription.plan === "single" ? "Single feature" : "Pro plan"}
          </p>
          <h3 className="mt-1 text-xl font-bold capitalize text-(--primary-text)">
            {subscription.plan}
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-(--accent-color2)/10 px-3 py-1 text-sm font-medium capitalize text-(--accent-color2)">
          <BadgeCheck size={15} aria-hidden="true" />
          {subscription.status}
        </span>
      </div>

      {subscription.plan === "single" && (
        <div className="mt-5 rounded-md border border-(--primary-border) p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-(--secondary-text)">
            Included features
          </p>
          {singlePlanFeatures.length > 0 ? (
            <ul className="mt-2 divide-y divide-(--primary-border)">
              {singlePlanFeatures.map((feature) => {
                const FeatureIcon = feature.icon;
                const details = (
                  <>
                    <div className="flex min-w-0 items-center gap-2">
                      {FeatureIcon && (
                        <FeatureIcon size={16} className="shrink-0 text-(--accent-color1)" aria-hidden="true" />
                      )}
                      <span className="truncate font-semibold text-(--primary-text)">{feature.title}</span>
                      <span className="shrink-0 font-mono text-xs text-(--secondary-text)">
                        {feature.id}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-(--secondary-text)">{feature.description}</p>
                  </>
                );

                return (
                  <li key={feature.id}>
                    {feature.path ? (
                      <Link
                        to={feature.path}
                        aria-label={`Open ${feature.title} feature page`}
                        className="group block py-3 first:pt-1 last:pb-1"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0 flex-1">{details}</div>
                          <ArrowUpRight
                            size={16}
                            className="shrink-0 text-(--secondary-text) transition-colors group-hover:text-(--accent-color1)"
                            aria-hidden="true"
                          />
                        </div>
                      </Link>
                    ) : (
                      <div className="py-3 first:pt-1 last:pb-1">{details}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-(--secondary-text)">
              {subscription.featureId
                ? `Feature ID: ${subscription.featureId}`
                : "No single-plan features found."}
            </p>
          )}
        </div>
      )}

      <dl className="mt-5 grid grid-cols-1 gap-4 border-t border-(--primary-border) pt-4 sm:grid-cols-2">
        <div>
          <dt className="flex items-center gap-2 text-xs font-medium text-(--secondary-text)">
            <CalendarDays size={14} aria-hidden="true" /> Started
          </dt>
          <dd className="mt-1 text-sm font-medium text-(--primary-text)">
            {formatDate(subscription.startedAt)}
          </dd>
        </div>
        <div>
          <dt className="flex items-center gap-2 text-xs font-medium text-(--secondary-text)">
            <CalendarDays size={14} aria-hidden="true" /> Expires
          </dt>
          <dd className="mt-1 text-sm font-medium text-(--primary-text)">
            {formatDate(subscription.expiresAt, "No expiry date")}
          </dd>
        </div>
      </dl>

      {metadata.length > 0 && (
        <dl className="mt-4 grid grid-cols-1 gap-3 border-t border-(--primary-border) pt-4 sm:grid-cols-2">
          {metadata.map(([key, value]) => (
            <div key={key} className="min-w-0">
              <dt className="text-xs font-medium capitalize text-(--secondary-text)">
                {key.replace(/([A-Z])/g, " $1")}
              </dt>
              <dd className="mt-1 break-words text-sm text-(--primary-text)">{String(value)}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
};

const ProfilePage = () => {
  const { isGray, userData, featuresAccess } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const singlePlanFeatures = features.filter((feature) => featuresAccess?.[feature.id]);
  const activePlans = (userData?.subscriptions ?? []).filter(
    (subscription) =>
      subscription.status === "active" &&
      ["single", "pro"].includes(subscription.plan)
  );

  const handleLogout = () => {
    localStorage.removeItem("rafAccessToken");
    dispatch(clearUserData());
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 bg-(--primary-bg) text-(--primary-text) ${isGray ? "gray-theme" : ""}`}
    >
      <Navbar isGray={isGray} />

      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <section className="flex flex-col justify-between gap-5 border-b border-(--primary-border) pb-7 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-(--accent-color1)">
              Account
            </p>
            <h1 className="mt-2 text-3xl font-bold text-(--primary-text)">Your profile</h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-md border border-(--primary-border) px-4 py-2 text-sm font-semibold text-(--primary-text) transition-colors hover:border-(--accent-color3) hover:text-(--accent-color3) sm:self-auto"
          >
            <LogOut size={16} aria-hidden="true" />
            Log out
          </button>
        </section>

        <section aria-labelledby="profile-details" className="py-7">
          <h2 id="profile-details" className="text-lg font-semibold text-(--primary-text)">
            Basic information
          </h2>
          <div className="mt-4 flex flex-col gap-4 rounded-lg border border-(--primary-border) bg-(--secondary-bg) p-5 sm:flex-row sm:items-center sm:p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--accent-color1)/10 text-(--accent-color1)">
              <UserRound size={22} aria-hidden="true" />
            </div>
            <dl className="grid min-w-0 flex-1 grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <div className="min-w-0">
                <dt className="text-xs font-medium text-(--secondary-text)">Name</dt>
                <dd className="mt-1 break-words font-semibold text-(--primary-text)">
                  {userData?.name || "Name not available"}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-xs font-medium text-(--secondary-text)">Email</dt>
                <dd className="mt-1 break-all font-semibold text-(--primary-text)">
                  {userData?.email || "Email not available"}
                </dd>
              </div>
              {userData?.provider && (
                <div>
                  <dt className="text-xs font-medium text-(--secondary-text)">Sign-in method</dt>
                  <dd className="mt-1 font-semibold capitalize text-(--primary-text)">
                    {userData.provider}
                  </dd>
                </div>
              )}
              {userData?.createdAt && (
                <div>
                  <dt className="text-xs font-medium text-(--secondary-text)">Member since</dt>
                  <dd className="mt-1 font-semibold text-(--primary-text)">
                    {formatDate(userData.createdAt)}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </section>

        <section aria-labelledby="active-plans" className="pb-10">
          <div className="flex items-center gap-3">
            <CreditCard className="text-(--accent-color1)" size={20} aria-hidden="true" />
            <div>
              <h2 id="active-plans" className="text-lg font-semibold text-(--primary-text)">
                Active plans
              </h2>
              <p className="mt-0.5 text-sm text-(--secondary-text)">
                {activePlans.length} {activePlans.length === 1 ? "plan" : "plans"} active
              </p>
            </div>
          </div>

          {activePlans.length ? (
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {activePlans.map((subscription, index) => (
                <PlanCard
                  key={`${subscription.plan}-${subscription.featureId ?? index}`}
                  subscription={subscription}
                  singlePlanFeatures={singlePlanFeatures}
                />
              ))}
            </div>
          ) : (
            <p className="mt-5 rounded-lg border border-dashed border-(--primary-border) px-5 py-8 text-center text-sm text-(--secondary-text)">
              You do not have any active Single or Pro plans.
            </p>
          )}
        </section>
      </main>

      <Footer isGray={isGray} />
    </div>
  );
};

export default ProfilePage