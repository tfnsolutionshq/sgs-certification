import { useState } from 'react'
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Download, 
  Calendar, 
  Filter,
  FileText,
  Users,
  Award,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  RefreshCw
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import Card, { CardContent, CardHeader } from '../components/Card'

// Dummy data for reports
const summaryStats = {
  totalCertificates: 1247,
  certificatesChange: 12.5,
  totalVerifications: 8934,
  verificationsChange: 23.1,
  activeLearners: 599,
  learnersChange: 5.2,
  generationSuccess: 98.4,
  successChange: 0.8
}

const certificatesByType = [
  { type: 'Diploma', count: 542, percentage: 43.5 },
  { type: 'Certificate of Completion', count: 389, percentage: 31.2 },
  { type: 'Academic Transcript', count: 198, percentage: 15.9 },
  { type: 'Professional Certificate', count: 118, percentage: 9.4 }
]

const certificatesByCohort = [
  { cohort: 'Batch 2024-A', issued: 142, pending: 14, total: 156 },
  { cohort: 'Batch 2024-B', issued: 0, pending: 89, total: 89 },
  { cohort: 'Batch 2023-C', issued: 142, pending: 0, total: 142 },
  { cohort: 'Batch 2023-B', issued: 78, pending: 0, total: 78 },
  { cohort: 'Batch 2023-A', issued: 134, pending: 0, total: 134 }
]

const verificationTrends = [
  { month: 'Jan', verifications: 1234 },
  { month: 'Feb', verifications: 1456 },
  { month: 'Mar', verifications: 1678 },
  { month: 'Apr', verifications: 1234 },
  { month: 'May', verifications: 1890 },
  { month: 'Jun', verifications: 2012 }
]

const topVerifiedCertificates = [
  { id: 'CERT-2024-001234', recipient: 'John Doe', type: 'Diploma', verifications: 47, lastVerified: '2024-03-15' },
  { id: 'CERT-2023-000567', recipient: 'Jane Smith', type: 'Certificate', verifications: 35, lastVerified: '2024-03-14' },
  { id: 'CERT-2023-000890', recipient: 'Mike Johnson', type: 'Diploma', verifications: 28, lastVerified: '2024-03-13' },
  { id: 'CERT-2024-001111', recipient: 'Sarah Wilson', type: 'Transcript', verifications: 22, lastVerified: '2024-03-12' },
  { id: 'CERT-2023-002222', recipient: 'Tom Brown', type: 'Professional', verifications: 19, lastVerified: '2024-03-11' }
]

const generationJobsStats = [
  { status: 'Completed', count: 45, color: 'bg-green-500' },
  { status: 'In Progress', count: 2, color: 'bg-yellow-500' },
  { status: 'Failed', count: 3, color: 'bg-red-500' },
  { status: 'Queued', count: 5, color: 'bg-blue-500' }
]

export default function Reports() {
  const [dateRange, setDateRange] = useState('last_30_days')
  const [selectedReport, setSelectedReport] = useState('overview')

  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        description="View insights and analytics about certificate generation and verification"
        action={
          <div className="flex gap-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="last_7_days">Last 7 Days</option>
              <option value="last_30_days">Last 30 Days</option>
              <option value="last_90_days">Last 90 Days</option>
              <option value="this_year">This Year</option>
              <option value="all_time">All Time</option>
            </select>
            <Button variant="secondary">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Certificates</p>
                <p className="text-2xl font-bold text-text-dark">{summaryStats.totalCertificates.toLocaleString()}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Award className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-600 font-medium">+{summaryStats.certificatesChange}%</span>
              <span className="text-gray-500">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Verifications</p>
                <p className="text-2xl font-bold text-text-dark">{summaryStats.totalVerifications.toLocaleString()}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-600 font-medium">+{summaryStats.verificationsChange}%</span>
              <span className="text-gray-500">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Active Learners</p>
                <p className="text-2xl font-bold text-text-dark">{summaryStats.activeLearners.toLocaleString()}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-600 font-medium">+{summaryStats.learnersChange}%</span>
              <span className="text-gray-500">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Generation Success Rate</p>
                <p className="text-2xl font-bold text-text-dark">{summaryStats.generationSuccess}%</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-600 font-medium">+{summaryStats.successChange}%</span>
              <span className="text-gray-500">vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Certificates by Type */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h3 className="font-semibold text-text-dark">Certificates by Type</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {certificatesByType.map((item) => (
                <div key={item.type}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-text-dark">{item.type}</span>
                    <span className="text-sm text-gray-500">{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Verification Trends */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h3 className="font-semibold text-text-dark">Verification Trends</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-48 gap-2">
              {verificationTrends.map((item) => {
                const maxVerifications = Math.max(...verificationTrends.map(v => v.verifications))
                const height = (item.verifications / maxVerifications) * 100
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-primary/80 rounded-t hover:bg-primary transition-colors cursor-pointer"
                      style={{ height: `${height}%` }}
                      title={`${item.verifications} verifications`}
                    />
                    <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Average: <span className="font-medium text-text-dark">1,584</span> verifications/month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Cohort Progress */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <h3 className="font-semibold text-text-dark">Certificate Issuance by Cohort</h3>
            <Button variant="secondary" size="sm">
              <Eye className="h-3 w-3 mr-1" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide pb-3">Cohort</th>
                    <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wide pb-3">Issued</th>
                    <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wide pb-3">Pending</th>
                    <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wide pb-3">Total</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide pb-3">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {certificatesByCohort.map((cohort) => {
                    const progress = (cohort.issued / cohort.total) * 100
                    return (
                      <tr key={cohort.cohort} className="border-b border-gray-50">
                        <td className="py-3 text-sm font-medium text-text-dark">{cohort.cohort}</td>
                        <td className="py-3 text-sm text-center text-green-600">{cohort.issued}</td>
                        <td className="py-3 text-sm text-center text-yellow-600">{cohort.pending}</td>
                        <td className="py-3 text-sm text-center text-gray-500">{cohort.total}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full ${progress === 100 ? 'bg-green-500' : 'bg-primary'}`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 w-10">{Math.round(progress)}%</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Generation Jobs Summary */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-text-dark">Generation Jobs</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generationJobsStats.map((stat) => (
                <div key={stat.status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                    <span className="text-sm text-gray-600">{stat.status}</span>
                  </div>
                  <span className="text-sm font-medium text-text-dark">{stat.count}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total Jobs</span>
                <span className="text-sm font-semibold text-text-dark">55</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Verified Certificates */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <h3 className="font-semibold text-text-dark">Most Verified Certificates</h3>
          <Button variant="secondary" size="sm">
            <Download className="h-3 w-3 mr-1" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide pb-3">Credential ID</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide pb-3">Recipient</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide pb-3">Type</th>
                  <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wide pb-3">Verifications</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide pb-3">Last Verified</th>
                </tr>
              </thead>
              <tbody>
                {topVerifiedCertificates.map((cert, idx) => (
                  <tr key={cert.id} className="border-b border-gray-50">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                          idx === 1 ? 'bg-gray-200 text-gray-600' :
                          idx === 2 ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="text-sm font-mono text-text-dark">{cert.id}</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-text-dark">{cert.recipient}</td>
                    <td className="py-3 text-sm text-gray-500">{cert.type}</td>
                    <td className="py-3 text-sm text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        <CheckCircle className="h-3 w-3" />
                        {cert.verifications}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-500">{cert.lastVerified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reports */}
      <div className="mt-6">
        <h3 className="font-semibold text-text-dark mb-4">Quick Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-sm transition-all text-left">
            <FileText className="h-5 w-5 text-primary mb-2" />
            <h4 className="font-medium text-text-dark">Certificate Summary</h4>
            <p className="text-xs text-gray-500 mt-1">All issued certificates with details</p>
          </button>
          <button className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-sm transition-all text-left">
            <Users className="h-5 w-5 text-primary mb-2" />
            <h4 className="font-medium text-text-dark">Learner Report</h4>
            <p className="text-xs text-gray-500 mt-1">Complete learner directory</p>
          </button>
          <button className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-sm transition-all text-left">
            <CheckCircle className="h-5 w-5 text-primary mb-2" />
            <h4 className="font-medium text-text-dark">Verification Log</h4>
            <p className="text-xs text-gray-500 mt-1">All verification activities</p>
          </button>
          <button className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-sm transition-all text-left">
            <AlertCircle className="h-5 w-5 text-primary mb-2" />
            <h4 className="font-medium text-text-dark">Error Report</h4>
            <p className="text-xs text-gray-500 mt-1">Generation failures and issues</p>
          </button>
        </div>
      </div>
    </div>
  )
}
